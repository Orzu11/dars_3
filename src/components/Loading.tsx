function Loading() {
    return (
        <div className="min-h-65 w-full flex items-center justify-center">
            <div className="relative">

                <div className="relative w-[320px] h-35 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
                    {/* shimmer bar */}
                    <div className="absolute left-0 top-0 h-full w-1/2 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]" />

                    {/* dots */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-indigo-400/80 animate-bounce [animation-delay:-0.2s]" />
                        <span className="h-3 w-3 rounded-full bg-fuchsia-400/70 animate-bounce [animation-delay:-0.1s]" />
                        <span className="h-3 w-3 rounded-full bg-cyan-300/70 animate-bounce" />
                    </div>

                    {/* rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute h-16 w-16 rounded-full border border-white/10 animate-ping" />
                        <span className="absolute h-24 w-24 rounded-full border border-indigo-400/15 animate-[ping_1.6s_infinite]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute h-16 w-16 rounded-full border border-white/10 animate-ping" />
                        <span className="absolute h-24 w-24 rounded-full border border-indigo-400/15 animate-[ping_1.6s_infinite]" />
                    </div>
                </div>

                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-120%); }
                        100% { transform: translateX(240%); }
                    }
                `}</style>
            </div>
        </div>
    );
}

export default Loading;