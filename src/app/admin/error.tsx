'use client';

import { useEffect } from 'react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[AdminError]', error);
    }, [error]);

    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                        Error en el Panel
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Hubo un problema al cargar esta sección. Intentá de nuevo o volvé al dashboard.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-5 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
                    >
                        Reintentar
                    </button>
                    <a
                        href="/admin"
                        className="px-5 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/30 transition-all"
                    >
                        Ir al Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
