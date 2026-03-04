import { useState, useEffect } from 'react'
import './App.css'

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 bg-black/70 backdrop-blur-md border-b border-white/10">
      <span className="text-white text-xl font-semibold tracking-tight">arqis</span>
      <ul className="hidden md:flex gap-8 text-sm text-gray-400">
        {['Home', 'Project', 'Contact', 'Support'].map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="text-sm font-medium text-black bg-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        Get started
      </a>
    </nav>
  )
}

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-48 pb-32 px-6">
      <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 border border-white/10 rounded-full px-4 py-1.5 bg-white/5">
        Now in public beta
      </span>
      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl">
        Build products <br />
        <span className="text-gray-400">people love to use</span>
      </h1>
      <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
        Acme gives your team the tools to ship faster, collaborate smarter, and
        deliver experiences that feel inevitable.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <a
          href="#"
          className="px-7 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          Start for free
        </a>
        <a
          href="#"
          className="px-7 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
        >
          View demo
        </a>
      </div>

      {/* Watch image with hover reveal */}
      <div className="mt-14 group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg">
        {/* Image shifts left on hover */}
        <img
          src="/watch.jpg"
          alt="Watch"
          className="w-full h-auto block object-contain transition-transform duration-500 ease-in-out group-hover:-translate-x-1/3"
        />
        {/* Description slides in from right */}
        <div className="absolute inset-y-0 right-0 w-1/2 flex flex-col justify-center px-4 bg-black/80 backdrop-blur-sm translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0">
          <p className="text-white text-sm font-semibold leading-snug">Precision Timepiece</p>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">Crafted for those who value every second.</p>
        </div>
      </div>
    </section>
  )
}
const SLIDES = [
  { caption: 'The Classic Edition',     sub: 'Timeless design, engineered to perfection.' },
  { caption: 'The Sport Series',        sub: 'Built for those who never stop moving.' },
  { caption: 'The Midnight Collection', sub: 'Dark elegance for every occasion.' },
  { caption: 'The Heritage Line',       sub: 'Inspired by decades of craftsmanship.' },
  { caption: 'The Avant-Garde',         sub: 'Where art meets precision engineering.' },
]

function Slider() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent(c => (c + 1) % SLIDES.length)
  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    const t = setInterval(next, 3500)
    return () => clearInterval(t)
  }, [])

  const getStyle = (i) => {
    let d = i - current
    if (d > SLIDES.length / 2) d -= SLIDES.length
    if (d < -SLIDES.length / 2) d += SLIDES.length
    if (d === 0)  return { transform: 'translateX(0%)   scale(1)',   filter: 'blur(0px)',  opacity: 1 }
    if (d === 1)  return { transform: 'translateX(110%) scale(0.88)', filter: 'blur(7px)',  opacity: 0 }
    if (d === -1) return { transform: 'translateX(-110%) scale(0.88)', filter: 'blur(7px)', opacity: 0 }
    return            { transform: 'translateX(110%) scale(0.8)',  filter: 'blur(14px)', opacity: 0 }
  }

  return (
    <section className="py-20 flex flex-col items-center px-6">
      <div className="relative w-[90%] h-[55vh] overflow-hidden rounded-2xl border border-white/10 shadow-xl mx-auto">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            style={{
              ...getStyle(i),
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.65s cubic-bezier(0.77,0,0.175,1), filter 0.65s ease, opacity 0.65s ease',
            }}
          >
            <img src="/watch.jpg" alt={slide.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-semibold text-base">{slide.caption}</p>
              <p className="text-gray-400 text-xs mt-1">{slide.sub}</p>
            </div>
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition text-lg"
        >&#8249;</button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition text-lg"
        >&#8250;</button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === current ? '20px' : '8px', background: i === current ? '#fff' : 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>
    </section>
  )
}

function WatchCard() {
  return (
    <section className="px-6 pb-20 flex justify-center">
      <div className="group relative w-[90%] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg">
        <img
          src="/watch.jpg"
          alt="Watch"
          className="w-full h-auto block object-contain transition-transform duration-500 ease-in-out group-hover:-translate-x-1/3"
        />
        <div className="absolute inset-y-0 right-0 w-1/2 flex flex-col justify-center px-6 bg-black/80 backdrop-blur-sm translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0">
          <p className="text-white font-semibold text-base leading-snug">Precision Timepiece</p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">Crafted for those who value every second. Swiss movement, sapphire glass, lifetime warranty.</p>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 px-10 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Ready to ship faster?
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Join thousands of teams already using arqis to build the next generation
          of software products.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          Get started — it's free
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 py-10 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} arqis, Inc. All rights reserved.
    </footer>
  )
}

/* ─── Layout wrapper ──────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Slider />
        <WatchCard />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
