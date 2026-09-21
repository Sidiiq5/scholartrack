const scholarships = [
  {
    name: "Erasmus Mundus Joint Masters",
    provider: "European Commission",
    degree: "Master's",
    funding: "Fully funded",
    country: "Europe",
    deadline: "15 Jan 2027",
    remaining: "119 days remaining",
    requirement: "IELTS required",
    tone: "amber",
  },
  {
    name: "DAAD EPOS Scholarships",
    provider: "German Academic Exchange Service",
    degree: "Master's",
    funding: "Full scholarship",
    country: "Germany",
    deadline: "31 Jan 2027",
    remaining: "135 days remaining",
    requirement: "Work experience varies",
    tone: "blue",
  },
  {
    name: "Türkiye Scholarships",
    provider: "Government of Türkiye",
    degree: "Bachelor's · Master's · PhD",
    funding: "Fully funded",
    country: "Türkiye",
    deadline: "20 Feb 2027",
    remaining: "155 days remaining",
    requirement: "Language requirements vary",
    tone: "teal",
  },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M6.5 4.75A1.75 1.75 0 0 1 8.25 3h7.5a1.75 1.75 0 0 1 1.75 1.75V21l-5.5-3.35L6.5 21V4.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
      <path
        d="M4 10h11m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function Logo() {
  return (
    <div className="select-none text-xl font-semibold tracking-[-0.03em]">
      <span className="text-slate-100">Scholar</span>
      <span className="text-amber-300">Track</span>
    </div>
  );
}

function Filter({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="focus-ring flex min-h-11 items-center justify-between gap-8 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      aria-label={`Filter by ${label}`}
    >
      {label}
      <span className="text-slate-400">⌄</span>
    </button>
  );
}

function ScholarshipCard({
  scholarship,
}: {
  scholarship: (typeof scholarships)[number];
}) {
  const tone =
    scholarship.tone === "amber"
      ? "bg-amber-50 text-amber-800"
      : scholarship.tone === "teal"
        ? "bg-teal-50 text-teal-700"
        : "bg-blue-50 text-blue-700";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
            {scholarship.provider}
          </p>
          <h2 className="mt-2 text-lg font-semibold leading-7 tracking-[-0.015em] text-slate-950">
            {scholarship.name}
          </h2>
        </div>
        <button
          type="button"
          aria-label={`Save ${scholarship.name}`}
          className="focus-ring grid min-h-11 min-w-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <BookmarkIcon />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
        <span className={`rounded-full px-2.5 py-1 ${tone}`}>{scholarship.degree}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
          {scholarship.funding}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
          {scholarship.country}
        </span>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
          Application deadline
        </p>
        <p className="mt-1.5 text-base font-semibold text-slate-950">
          {scholarship.deadline}
        </p>
        <p className="mt-1 text-sm font-medium text-amber-700">
          {scholarship.remaining}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-600">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-teal-500" />
          {scholarship.requirement}
        </span>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View details
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="border-b border-white/10 bg-[#0b1220]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#" className="focus-ring rounded-lg" aria-label="ScholarTrack home">
            <Logo />
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#scholarships">Scholarships</a>
            <a className="transition hover:text-white" href="#how-it-works">How it works</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="focus-ring hidden min-h-10 rounded-xl px-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Sign in
            </button>
            <button
              type="button"
              className="focus-ring min-h-10 rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-9 pt-12 lg:px-8 lg:pb-12 lg:pt-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Scholarship discovery, simplified
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
              Find scholarships that fit your future.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover structured opportunities, understand the requirements, and keep the ones that matter within reach.
            </p>
          </div>

          <div className="mt-8 max-w-4xl">
            <label htmlFor="scholarship-search" className="sr-only">
              Search scholarships
            </label>
            <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 shadow-[0_4px_18px_rgba(15,23,42,0.06)] focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
              <span className="text-slate-400"><SearchIcon /></span>
              <input
                id="scholarship-search"
                type="search"
                placeholder="Search scholarships, fields, universities..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
              />
              <button
                type="button"
                className="focus-ring hidden min-h-10 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
            <Filter label="Degree level" />
            <Filter label="Field of study" />
            <Filter label="Country" />
            <Filter label="Funding" />
            <Filter label="Deadline" />
            <Filter label="Language" />
          </div>
        </div>
      </section>

      <section id="scholarships" className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Explore opportunities</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-slate-950">
                Scholarships
              </h2>
              <span className="text-sm text-slate-500">248 opportunities</span>
            </div>
          </div>
          <button
            type="button"
            className="focus-ring flex min-h-10 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:self-auto"
          >
            Sort: Deadline soonest
            <span className="text-slate-400">⌄</span>
          </button>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.name} scholarship={scholarship} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-slate-200 bg-[#f1f5f9]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-blue-600">The ScholarTrack flow</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-slate-950">
              From discovery to a clear next step.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              ScholarTrack organizes the information. The official scholarship provider remains the source of truth.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Discover", "Understand", "Save", "Prepare"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                <h3 className="mt-5 font-semibold text-slate-950">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {[
                    "Search and filter opportunities that match your goals.",
                    "See funding, deadlines, requirements, and official sources clearly.",
                    "Keep promising opportunities in your personal shortlist.",
                    "Know what you need before moving to the official application.",
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0b1220]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Logo />
          <p>Find scholarships. Understand them. Save them. Prepare for them.</p>
        </div>
      </footer>
    </main>
  );
}
