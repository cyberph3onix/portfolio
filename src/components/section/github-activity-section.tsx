import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";

const WEEKS_TO_SHOW = 36;
const DAYS_TO_SHOW = WEEKS_TO_SHOW * 7;
const REVALIDATE_SECONDS = 60 * 60 * 6;
const GITHUB_URL = DATA.contact.social.GitHub.url;
const GITHUB_USERNAME = GITHUB_URL.split("/").filter(Boolean).at(-1) ?? "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN?.trim() ?? "";

type GitHubEvent = {
  type: string;
  created_at: string;
  repo?: {
    name: string;
  };
};

type ContributionDay = {
  date: Date;
  key: string;
  count: number;
};

type GitHubStatsResult = {
  days: ContributionDay[];
  metricLabel: string;
  totalEvents: number;
  activeDays: number;
  currentStreak: number;
  repoCount: number | null;
  unavailable: boolean;
};

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getActivityLevel(count: number, maxCount: number) {
  if (count === 0 || maxCount === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil((count / maxCount) * 4));
}

function getLevelClass(level: number) {
  switch (level) {
    case 1:
      return "bg-primary/20 ring-primary/20";
    case 2:
      return "bg-primary/40 ring-primary/30";
    case 3:
      return "bg-primary/70 ring-primary/40";
    case 4:
      return "bg-primary ring-primary/50";
    default:
      return "bg-muted ring-border/70";
  }
}

function getCurrentStreak(days: ContributionDay[]) {
  let streak = 0;

  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].count === 0) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function buildEmptyDays(): ContributionDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: DAYS_TO_SHOW }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (DAYS_TO_SHOW - 1 - index));

    return {
      date,
      key: getDateKey(date),
      count: 0,
    };
  });
}

function summarize(days: ContributionDay[]) {
  return {
    totalEvents: days.reduce((total, day) => total + day.count, 0),
    activeDays: days.filter((day) => day.count > 0).length,
    currentStreak: getCurrentStreak(days),
  };
}

function unavailableResult(): GitHubStatsResult {
  return {
    days: buildEmptyDays(),
    metricLabel: "public GitHub events",
    totalEvents: 0,
    activeDays: 0,
    currentStreak: 0,
    repoCount: null,
    unavailable: true,
  };
}

async function fetchContributions(username: string): Promise<GitHubStatsResult | null> {
  if (!username) {
    return null;
  }

  const from = new Date();
  from.setUTCDate(from.getUTCDate() - (DAYS_TO_SHOW - 1));
  const to = new Date();
  to.setUTCDate(to.getUTCDate() + 1);
  const fromKey = from.toISOString().slice(0, 10);
  const toKey = to.toISOString().slice(0, 10);
  const todayKey = new Date().toISOString().slice(0, 10);

  const query = `query ($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromKey,
          to: toKey,
        },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks: {
                contributionDays: { date: string; contributionCount: number }[];
              }[];
            };
          };
        };
      };
      errors?: { message: string }[];
    };

    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks || json.errors?.length) {
      return null;
    }

    const days = weeks
      .flatMap((week) => week.contributionDays)
      .filter((day) => day.date >= fromKey && day.date <= todayKey)
      .map((day) => ({
        date: new Date(`${day.date}T00:00:00Z`),
        key: day.date,
        count: day.contributionCount,
      }));

    const { totalEvents, activeDays, currentStreak } = summarize(days);

    return {
      days,
      metricLabel: "GitHub contributions",
      totalEvents,
      activeDays,
      currentStreak,
      repoCount: null,
      unavailable: false,
    };
  } catch {
    return null;
  }
}

async function fetchEvents(username: string): Promise<GitHubStatsResult> {
  if (!username) {
    return unavailableResult();
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) {
      return unavailableResult();
    }

    const events = (await response.json()) as GitHubEvent[];
    const days = buildEmptyDays();
    const dayMap = new Map(days.map((day) => [day.key, day]));

    for (const event of events) {
      const day = dayMap.get(getDateKey(new Date(event.created_at)));

      if (day) {
        day.count += 1;
      }
    }

    const { totalEvents, activeDays, currentStreak } = summarize(days);
    const repoCount = new Set(events.map((event) => event.repo?.name).filter(Boolean)).size;

    return {
      days,
      metricLabel: "public GitHub events",
      totalEvents,
      activeDays,
      currentStreak,
      repoCount,
      unavailable: false,
    };
  } catch {
    return unavailableResult();
  }
}

export default async function GitHubActivitySection() {
  const stats = GITHUB_TOKEN
    ? ((await fetchContributions(GITHUB_USERNAME)) ?? (await fetchEvents(GITHUB_USERNAME)))
    : await fetchEvents(GITHUB_USERNAME);

  const { days, metricLabel, unavailable } = stats;

  const maxCount = Math.max(...days.map((day) => day.count), 0);

  return (
    <section id="github-activity">
      <div className="flex min-h-0 flex-col gap-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icons.github className="size-5" aria-hidden />
            <h2 className="text-xl font-bold">GitHub Activity</h2>
          </div>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            @{GITHUB_USERNAME}
          </Link>
        </div>

        <div className="border bg-background rounded-xl px-4 py-3 shadow-sm ring-2 ring-border/20">
          <div className="overflow-x-auto">
            <div className="grid w-fit mx-auto grid-flow-col grid-rows-7 gap-1">
              {days.map((day) => {
                const level = getActivityLevel(day.count, maxCount);

                return (
                  <div
                    key={day.key}
                    className={`size-3 rounded-[2px] ring-1 ${getLevelClass(level)}`}
                    title={`${day.count} ${metricLabel} on ${day.date.toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                    aria-label={`${day.count} ${metricLabel}`}
                  />
                );
              })}
            </div>
          </div>

          {unavailable ? (
            <p className="mt-2 text-xs text-muted-foreground">
              GitHub activity is temporarily unavailable.
            </p>
          ) : null}

          <div className="mt-2.5 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>Last {WEEKS_TO_SHOW} weeks</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className={`size-2.5 rounded-[2px] ring-1 ${getLevelClass(level)}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}