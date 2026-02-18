function Loading() {
    return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center bg-transparent">
            <div className="relative group">
                
                {/* Tashqi Neon Nur (Glow effect) */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>

                {/* Asosiy Konteyner */}
                <div className="relative w-[350px] h-48 rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center gap-6">
                    
                    {/* Shimmer (Yaltiroq chiziq) */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>

                    {/* Markaziy Animatsiya: Dots & Pulsing Rings */}
                    <div className="relative flex items-center justify-center h-20">
                        {/* Halqalar */}
                        <span className="absolute h-16 w-16 rounded-full border border-indigo-500/30 animate-ping"></span>
                        <span className="absolute h-24 w-24 rounded-full border border-fuchsia-500/20 animate-[ping_1.5s_infinite]"></span>
                        <span className="absolute h-32 w-32 rounded-full border border-cyan-500/10 animate-[ping_2s_infinite]"></span>

                        {/* Sakrayotgan nuqtalar */}
                        <div className="flex gap-3 z-10">
                            <span className="h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-4 w-4 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.8)] animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-bounce"></span>
                        </div>
                    </div>

                    {/* Matn qismi */}
                    <div className="flex flex-col items-center gap-1 z-10">
                        <span className="text-white/80 font-medium tracking-[0.3em] uppercase text-[10px] animate-pulse">
                            Yuklanmoqda
                        </span>
                        <span className="text-cyan-400 italic font-light text-xs tracking-widest">
                            Iltimos, kuting...
                        </span>
                    </div>

                </div>

                {/* CSS Keyframes */}
                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-150%) skewX(-15deg); }
                        100% { transform: translateX(150%) skewX(-15deg); }
                    }
                `}</style>
            </div>
        </div>
    );
}

export default Loading;