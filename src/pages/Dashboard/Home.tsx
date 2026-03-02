import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 2000)
    return () => clearInterval(t)
  }, [])

  const stats = [
    { val: '2.5M+', label: 'Resurslar' },
    { val: '140+',  label: 'Davlatlar' },
    { val: '24/7',  label: 'Dastak'    },
  ]

  const tags = ['Fiction', 'Science', 'History', 'Art', 'Technology', 'Philosophy']

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080010] font-mono">

      {/* ── animated grid background ── */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="absolute top-0 left-0 w-40 h-40 z-10 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-px bg-violet-500" />
        <div className="absolute top-8 left-8 w-px h-16 bg-violet-500" />
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 z-10 pointer-events-none">
        <div className="absolute top-8 right-8 w-16 h-px bg-cyan-500" />
        <div className="absolute top-8 right-8 w-px h-16 bg-cyan-500" />
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40 z-10 pointer-events-none">
        <div className="absolute bottom-8 left-8 w-16 h-px bg-cyan-500" />
        <div className="absolute bottom-8 left-8 w-px h-16 bg-cyan-500" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 z-10 pointer-events-none">
        <div className="absolute bottom-8 right-8 w-16 h-px bg-violet-500" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-violet-500" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-20 flex items-center justify-between px-10 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400/60 text-[10px] tracking-[0.4em] uppercase">System Online</span>
        </div>
        <div className="flex items-center gap-6">
          {['Catalog', 'About', 'Contact'].map(item => (
            <button key={item} className="text-white/30 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-300">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-violet-400 text-[10px] tracking-[0.5em] uppercase">
            Knowledge Archive v2.0
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
        </div>

        <h1 className="mb-2 text-white text-[80px] md:text-[120px] font-black leading-none tracking-[-4px] uppercase">
          BILIM
        </h1>
        <h1 className="mb-8 text-[80px] md:text-[120px] font-black leading-none tracking-[-4px] uppercase"
          style={{
            WebkitTextStroke: '2px rgba(139,92,246,0.8)',
            color: 'transparent',
            textShadow: '0 0 60px rgba(139,92,246,0.3)'
          }}
        >
          XAZINASI
        </h1>

        <div className="w-full max-w-2xl relative mt-4">
          <div className="absolute -inset-px rounded-none bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 opacity-60"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
          <div className="relative flex bg-[#080010]">
            <span className="flex items-center px-4 text-violet-400 text-xs tracking-widest border-r border-violet-500/30">
              SRH
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search.trim() && navigate('/products')}
              placeholder="Kitob nomini yozing..."
              className="flex-1 bg-transparent px-6 py-5 text-white text-sm placeholder:text-white/20 outline-none tracking-wider"
            />
            <button
              onClick={() => search.trim() && navigate('/products')}
              className="px-8 text-[10px] tracking-[0.3em] uppercase font-bold text-black bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-80 transition-opacity"
            >
              Run
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => navigate('/products')}
              className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white/30 border border-white/10 hover:border-violet-500/60 hover:text-violet-400 transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 border-t border-white/5">
        <div className="flex items-stretch">
          {stats.map((s, i) => (
            <div key={i} className={`flex-1 py-6 flex flex-col items-center gap-1 ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}>
              <span className="text-2xl font-black text-white tracking-widest"
                style={{ textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>
                {s.val}
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">{s.label}</span>
            </div>
          ))}
          <div className="flex-1 py-6 flex flex-col items-center gap-1 border-l border-white/5">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${tick % 2 === 0 ? 'bg-cyan-400' : 'bg-transparent'} transition-all duration-300`} />
              <span className="text-2xl font-black text-white tracking-widest"
                style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}>
                LIVE
              </span>
            </div>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">Real-time</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
        }}
      />

    </div>
  )
}

export default Home