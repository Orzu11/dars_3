import React from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ open, onClose, children }: Props) {
    if (!open) return null;

    return (
        <div className={`fixed duration-300 top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center`}>
            <div onClick={onClose} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

            {/* Modal */}
            <div className="
                relative w-full max-w-md mx-4
                rounded-2xl border border-white/10
                bg-[#0B1224]/90 backdrop-blur-xl
                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                overflow-hidden
            ">
                <div className="
                    absolute -top-16 left-1/2 -translate-x-1/2
                    w-100 h-50
                    bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_60%)]
                    blur-3xl
                " />

                <div className="relative p-6 text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;