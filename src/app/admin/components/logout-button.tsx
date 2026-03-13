'use client';

import { LogOut } from 'lucide-react';
import { logout } from '@/app/login/actions';
import { useTransition } from 'react';

export function LogoutButton({ iconOnly }: { iconOnly?: boolean }) {
    const [isPending, startTransition] = useTransition();

    if (iconOnly) {
        return (
            <button
                onClick={() => startTransition(() => logout())}
                disabled={isPending}
                className="flex flex-col items-center gap-1 text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-50"
                title="Cerrar Sesión"
            >
                <LogOut className="w-5 h-5" />
                <span className="text-[10px] uppercase font-medium">Salir</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => startTransition(() => logout())}
            disabled={isPending}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-red-400/70 hover:text-red-400 transition-colors text-sm text-left disabled:opacity-50"
        >
            <LogOut className="w-4 h-4" />
            {isPending ? 'Saliendo...' : 'Cerrar Sesión'}
        </button>
    );
}
