import React, { useState } from 'react';

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#020202] font-sans">
      
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted={isMuted} playsInline
          className="w-full h-full object-cover scale-105 transition-transform duration-1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-searching-for-a-book-in-a-library-34531-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-10 right-10 z-50 text-white/50 hover:text-cyan-400 transition-all flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase"
      >
        {isMuted ? 'Sound Off' : 'Sound On'}
        <div className="flex gap-1 items-end h-4">
          <div className={`w-1 bg-current ${!isMuted ? 'animate-bounce h-4' : 'h-1'}`}></div>
          <div className={`w-1 bg-current ${!isMuted ? 'animate-bounce delay-75 h-3' : 'h-1'}`}></div>
          <div className={`w-1 bg-current ${!isMuted ? 'animate-bounce delay-150 h-2' : 'h-1'}`}></div>
        </div>
      </button>

      <div className="relative z-20 h-full flex flex-col justify-center items-center px-6">
        
        <div className="animate-pulse mb-8">
           <span className="px-4 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] tracking-[0.4em] uppercase">
             Live Experience
           </span>
        </div>

        <h1 className="text-white text-7xl md:text-[140px] font-black leading-none tracking-tighter text-center">
          BILIM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            XAZINASI
          </span>
        </h1>

        <div className="mt-12 w-full max-w-xl relative group">
          <input 
            type="text" 
            placeholder="Kitob nomini yozing..." 
            className="w-full bg-white/5 border-b border-white/20 py-4 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-all backdrop-blur-sm italic"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold tracking-widest text-xs uppercase group-hover:text-white transition-colors">
            Search
          </button>
        </div>

       
        <div className="absolute bottom-20 flex gap-20 text-white/40">
           <div className="text-center">
             <div className="text-xl font-bold text-white tracking-widest">2.5M+</div>
             <div className="text-[10px] uppercase tracking-tighter">Resurslar</div>
           </div>
           <div className="text-center border-x border-white/10 px-20">
             <div className="text-xl font-bold text-white tracking-widest">140+</div>
             <div className="text-[10px] uppercase tracking-tighter">Davlatlar</div>
           </div>
           <div className="text-center">
             <div className="text-xl font-bold text-white tracking-widest">24/7</div>
             <div className="text-[10px] uppercase tracking-tighter">Dastak</div>
           </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

    </div>
  );
};

export default Home;