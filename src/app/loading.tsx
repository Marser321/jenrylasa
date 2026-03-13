export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-[var(--bg-void)] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Spinner minimalista con acento gold */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-gold)] animate-spin" />
                </div>
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-light">
                    Cargando
                </p>
            </div>
        </div>
    );
}
