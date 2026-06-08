import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";

type GitHubEvent = {
  type: string;
  created_at: string;
  repo?: {
    name: string;
  };
};

type GitHubEventsResult = {
  events: GitHubEvent[];
  unavailable: boolean;
};

const DAYS_TO_SHOW = 98;
const GITHUB_URL = DATA.contact.social.GitHub.url;
const GITHUB_USERNAME = GITHUB_URL.split("/").filter(Boolean).at(-1) ?? "";

async function getGitHubEvents(username: string): Promise<GitHubEventsResult> {
  if (!username) {
    return { events: [], unavailable: true };
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        next: { revalidate: 60 * 60 * 6 },
      }
    );

    if (!response.ok) {
      return { events: [], unavailable: true };
    }

    return {
      events: (await response.json()) as GitHubEvent[],
      unavailable: false,
    };
  } catch {
    return { events: [], unavailable: true };
  }
}

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

function getCurrentStreak(days: { date: Date; count: number }[]) {
  let streak = 0;

  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].count === 0) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export default async function GitHubActivitySection() {
  const { events, unavailable } = await getGitHubEvents(GITHUB_USERNAME);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: DAYS_TO_SHOW }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (DAYS_TO_SHOW - 1 - index));

    return {
      date,
      count: 0,
    };
  });

  const dayMap = new Map(days.map((day) => [getDateKey(day.date), day]));

  for (const event of events) {
    const day = dayMap.get(getDateKey(new Date(event.created_at)));

    if (day) {
      day.count += 1;
    }
  }

  const maxCount = Math.max(...days.map((day) => day.count), 0);
  const activeDays = days.filter((day) => day.count > 0).length;
  const totalEvents = days.reduce((total, day) => total + day.count, 0);
  const repoCount = new Set(events.map((event) => event.repo?.name).filter(Boolean)).size;
  const currentStreak = getCurrentStreak(days);

  return (
    <section id="github-activity">
      <div className="flex min-h-0 flex-col gap-y-6">
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

        <div className="border bg-background rounded-xl p-4 shadow-sm ring-2 ring-border/20">
          <div className="grid grid-cols-3 gap-2 border-b pb-4">
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums">
                {totalEvents}
              </div>
              <div className="text-xs text-muted-foreground">events</div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums">
                {activeDays}
              </div>
              <div className="text-xs text-muted-foreground">active days</div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums">
                {repoCount || currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">
                {repoCount ? "repos" : "day streak"}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto pb-1">
            <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
              {days.map((day) => {
                const level = getActivityLevel(day.count, maxCount);

                return (
                  <div
                    key={getDateKey(day.date)}
                    className={`size-3 rounded-sm ring-1 ${getLevelClass(level)}`}
                    title={`${day.count} public GitHub ${
                      day.count === 1 ? "event" : "events"
                    } on ${day.date.toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                    aria-label={`${day.count} public GitHub events`}
                  />
                );
              })}
            </div>
          </div>

          {unavailable ? (
            <p className="mt-3 text-xs text-muted-foreground">
              GitHub activity is temporarily unavailable.
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>Last 14 weeks</span>
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
