import { GoogleSignInButton } from "@components";


const Home = () => {
  return (
    <main className="min-h-screen bg-base text-cream">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-md bg-base/80">
        <span className="font-[family-name:var(--font-serif)] text-xl tracking-wide text-cream">
          CaloriePal
        </span>
        <div className="flex items-center gap-6 text-sm font-light text-sand">
          <a href="#features" className="hover:text-cream transition-colors duration-200">
            Features
          </a>
          <a href="#how" className="hover:text-cream transition-colors duration-200">
            How it works
          </a>
          <a
            href="/dashboard"
            className="px-4 py-1.5 rounded-full border border-lime/40 text-lime text-sm hover:bg-lime/10 transition-all duration-200"
          >
            Get started
          </a>
          <GoogleSignInButton />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime/5 blur-[120px] pointer-events-none" />

        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-sand tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
          Now in development
        </div>

        <h1 className="animate-fade-up delay-100 font-[family-name:var(--font-serif)] text-6xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl">
          Track what
          <br />
          <span className="text-lime">fuels</span> you.
        </h1>

        <p className="animate-fade-up delay-200 mt-6 max-w-md text-sand text-lg font-light leading-relaxed">
          Nutrition tracking with a rich food database, recipe builder, and daily macro breakdown.
          Built for people who actually care.
        </p>

        <div className="animate-fade-up delay-300 mt-10 flex items-center gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-lime text-base font-medium text-sm hover:bg-lime-light transition-colors duration-200"
          >
            Start tracking
          </a>
          <a
            href="#how"
            className="px-6 py-3 rounded-full border border-white/10 text-sand text-sm hover:border-white/20 hover:text-cream transition-all duration-200"
          >
            See how it works
          </a>
        </div>

        <div className="animate-fade-up delay-400 mt-20 w-full max-w-sm mx-auto rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 text-left">
          <p className="text-xs text-sand uppercase tracking-widest mb-4">Today&apos;s summary</p>
          <div className="flex items-end justify-between mb-3">
            <span className="font-[family-name:var(--font-serif)] text-4xl text-cream">1,840</span>
            <span className="text-sm text-sand">/ 2,200 kcal</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden mb-5">
            <div className="h-full w-[84%] rounded-full bg-lime" />
          </div>
          {/* Macros row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: '148g', pct: '74%', color: 'bg-sky' },
              { label: 'Carbs', value: '195g', pct: '65%', color: 'bg-gold' },
              { label: 'Fat', value: '62g', pct: '89%', color: 'bg-rose' },
            ].map(macro => (
              <div key={macro.label} className="rounded-xl bg-white/4 p-3">
                <p className="text-[10px] text-sand uppercase tracking-wider mb-1">{macro.label}</p>
                <p className="text-sm font-medium text-cream">{macro.value}</p>
                <div className="mt-2 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                  <div className={`h-full rounded-full ${macro.color}`} style={{ width: macro.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-32 max-w-5xl mx-auto">
        <p className="text-xs text-sand uppercase tracking-widest mb-3">What you get</p>
        <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl mb-16 max-w-lg leading-tight">
          Everything you need, nothing you don&apos;t.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: '◉',
              title: 'Food database',
              desc: 'Thousands of foods and ingredients with full macro breakdowns per 100g.',
            },
            {
              icon: '◈',
              title: 'Recipe builder',
              desc: 'Combine ingredients into recipes. Macros calculate automatically.',
            },
            {
              icon: '◆',
              title: 'Daily log',
              desc: 'Log meals by type — breakfast, lunch, dinner, snacks. One log per day.',
            },
            {
              icon: '◇',
              title: 'Calorie goal',
              desc: 'Set your daily target based on your weight, height, and activity level.',
            },
            {
              icon: '○',
              title: 'Macro tracking',
              desc: 'Protein, carbs, fat and fiber — tracked separately with progress bars.',
            },
            {
              icon: '□',
              title: 'Clean API',
              desc: 'ASP.NET Core backend with clean architecture, ready to extend.',
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/6 bg-white/3 p-6 hover:border-white/12 hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-lime text-lg mb-4 block">{feature.icon}</span>
              <h3 className="font-medium text-cream mb-2">{feature.title}</h3>
              <p className="text-sm text-sand font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-sand uppercase tracking-widest mb-3">How it works</p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl mb-16 max-w-lg leading-tight">
            Simple by design.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
            {[
              { step: '01', title: 'Set your goal', desc: 'Enter your stats and daily calorie target.' },
              { step: '02', title: 'Log your meals', desc: 'Search foods or pick from your recipes.' },
              { step: '03', title: 'Track progress', desc: 'See your macros fill up through the day.' },
            ].map(item => (
              <div key={item.step} className="bg-base p-8">
                <span className="font-[family-name:var(--font-serif)] text-5xl text-white/8 block mb-6">
                  {item.step}
                </span>
                <h3 className="font-medium text-cream mb-2">{item.title}</h3>
                <p className="text-sm text-sand font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[family-name:var(--font-serif)] text-5xl sm:text-6xl mb-6 leading-tight">
            Ready to start?
          </h2>
          <p className="text-sand font-light mb-10">
            Your nutrition data, your way. No ads, no noise.
          </p>
          <a
            href="/dashboard"
            className="inline-block px-8 py-3.5 rounded-full bg-lime text-base font-medium hover:bg-lime-light transition-colors duration-200"
          >
            Open the app
          </a>
        </div>
      </section>

      <footer className="px-8 py-6 border-t border-white/5 flex items-center justify-between text-xs text-sand">
        <span className="font-[family-name:var(--font-serif)] text-sm text-cream">CaloriePal</span>
        <span>Built with Next.js · ASP.NET Core · PostgreSQL</span>
      </footer>
    </main>
  );
}

export default Home;
