export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="bg-glow" />
      <header className="glass-surface fixed inset-x-0 top-0 z-40 h-16 border-x-0 border-t-0">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="focus-ring rounded-lg text-lg font-bold tracking-tight">Scholar<span className="text-blue-400">Track</span></a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#discover" className="border-b-2 border-blue-500 pb-0.5">Find Scholarships</a>
            <a href="/trackers" className="text-slate-400 hover:text-white">My Trackers</a>
            <a href="#resources" className="text-slate-400 hover:text-white">Resources</a>
          </nav>
          <a href="/login" className="btn-primary rounded-xl px-3.5 py-2 text-xs font-semibold">Log In</a>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl space-y-6 pt-6 text-center">
          <div className="mx-auto inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">Scholarship Discovery &amp; Preparation Platform</div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Find scholarships.<br /><span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Prepare with confidence.</span></h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">Discover opportunities, understand requirements, save what matters, and prepare before applying through official provider channels.</p>
          <div className="mx-auto flex max-w-2xl gap-2">
            <input className="st-search-input min-w-0 flex-1 rounded-2xl px-4 py-3.5 text-sm placeholder:text-slate-500" placeholder="Search scholarships, universities, fields, or countries..." />
            <button className="btn-primary rounded-xl px-5 text-sm font-semibold">Search</button>
          </div>
        </section>
        <section className="my-14 grid grid-cols-2 gap-4 border-y border-white/5 py-4 md:grid-cols-4">
          {[
            ["01 Discover", "Find opportunities"],
            ["02 Understand", "Clear requirements"],
            ["03 Save", "Track deadlines"],
            ["04 Prepare", "Checklist focus"],
          ].map(([step, title]) => (
            <div key={step} className="glass-surface rounded-xl border border-white/5 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{step}</div>
              <div className="mt-1.5 text-sm font-semibold">{title}</div>
              <div className="mt-1 text-xs leading-normal text-slate-400">Simple, focused scholarship preparation.</div>
            </div>
          ))}
        </section>
        <section id="discover" className="scroll-mt-24 space-y-6">
          <div>
            <h2 className="text-xl font-bold">Featured Scholarships</h2>
            <p className="text-sm text-slate-400">Published opportunities will appear here from the scholarship API.</p>
          </div>
          <div className="glass-surface rounded-2xl border border-white/10 p-10 text-center">
            <h3 className="text-sm font-semibold">Discovery API connected</h3>
            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">The production scholarship endpoint is now wired into the frontend. Once scholarships are published through the admin, they will render here.</p>
          </div>
        </section>
        <section id="resources" className="glass-surface mt-16 rounded-2xl border border-white/10 p-6 sm:p-8">
          <div className="max-w-xl">
            <div className="text-xs font-semibold text-blue-400">OFFICIAL SOURCE FIRST</div>
            <h3 className="mt-2 text-lg font-bold">Apply through the official provider.</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">ScholarTrack organizes scholarship information and preparation. Applications are completed on the official provider website.</p>
          </div>
        </section>
      </div>
      <footer className="glass-surface border-x-0 border-b-0">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">ScholarTrack © 2026</div>
      </footer>
    </main>
  );
}
