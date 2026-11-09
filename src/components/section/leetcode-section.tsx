import Link from "next/link";

const USERNAME = "cyberph3onix";
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;
const WEEKS = 36;
const DAYS = WEEKS * 7;
const REVALIDATE_SECONDS = 60 * 60 * 6;

type Stats = {
  solved: { All: number; Easy: number; Medium: number; Hard: number };
  calendar: Record<string, number>;
};

async function fetchStats(): Promise<Stats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({
        query: `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{submissionCalendar}}}`,
        variables: { u: USERNAME },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;
    const solved = { All: 0, Easy: 0, Medium: 0, Hard: 0 };
    for (const r of user.submitStatsGlobal.acSubmissionNum) {
      if (r.difficulty in solved) solved[r.difficulty as keyof typeof solved] = r.count;
    }
    return { solved, calendar: JSON.parse(user.userCalendar.submissionCalendar) };
  } catch {
    return null;
  }
}

function levelClass(count: number, max: number) {
  if (count === 0 || max === 0) return "bg-muted ring-border/70";
  const level = Math.max(1, Math.ceil((count / max) * 4));
  return [
    "",
    "bg-primary/20 ring-primary/20",
    "bg-primary/40 ring-primary/30",
    "bg-primary/70 ring-primary/40",
    "bg-primary ring-primary/50",
  ][level];
}

export default async function LeetCodeSection() {
  const stats = await fetchStats();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const days = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - (DAYS - 1 - i));
    const count = stats?.calendar[String(d.getTime() / 1000)] ?? 0;
    return { d, count };
  });
  const max = Math.max(...days.map((x) => x.count), 0);

  return (
    <section id="leetcode">
      <div className="flex min-h-0 flex-col gap-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">LeetCode Stats</h2>
          <Link
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            @{USERNAME}
          </Link>
        </div>

        <div className="border bg-background rounded-xl px-4 py-3 shadow-sm ring-2 ring-border/20">
          {stats ? (
            <div className="mb-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <span>
                <span className="font-semibold">{stats.solved.All}</span>{" "}
                <span className="text-muted-foreground">solved</span>
              </span>
              <span className="text-muted-foreground">
                Easy <span className="font-semibold text-foreground">{stats.solved.Easy}</span>
              </span>
              <span className="text-muted-foreground">
                Medium <span className="font-semibold text-foreground">{stats.solved.Medium}</span>
              </span>
              <span className="text-muted-foreground">
                Hard <span className="font-semibold text-foreground">{stats.solved.Hard}</span>
              </span>
            </div>
          ) : (
            <p className="mb-3 text-xs text-muted-foreground">
              LeetCode stats are temporarily unavailable.
            </p>
          )}
          <div className="overflow-x-auto">
            <div className="grid w-fit mx-auto grid-flow-col grid-rows-7 gap-1">
              {days.map(({ d, count }) => (
                <div
                  key={d.getTime()}
                  className={`size-3 rounded-[2px] ring-1 ${levelClass(count, max)}`}
                  title={`${count} submissions on ${d.toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2.5 text-xs text-muted-foreground">Last {WEEKS} weeks</div>
        </div>
      </div>
    </section>
  );
}
