'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[ErrorBoundary]', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[var(--bg-void)] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icono decorativo */}
                <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-2xl font-display text-white mb-2">
                        Algo salió mal
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
                    >
                        Intentar de nuevo
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 rounded-lg border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/30 transition-all"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </div>
    );
}
