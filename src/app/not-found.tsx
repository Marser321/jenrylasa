import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--bg-void)] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Número 404 estilizado */}
                <h1 className="text-[8rem] md:text-[12rem] font-display text-white/[0.04] leading-none select-none tracking-tighter">
                    404
                </h1>

                <div className="-mt-20 relative z-10 space-y-3">
                    <h2 className="text-2xl md:text-3xl font-display text-white tracking-tight">
                        Página no encontrada
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                        La página que buscás no existe o fue movida. Volvé al inicio para seguir navegando.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-block px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase border border-white/20 rounded-sm text-white/80 hover:text-black hover:bg-white transition-all duration-300"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
