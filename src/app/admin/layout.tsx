import { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
    Users,
    LayoutDashboard,
    Calendar,
    FileText,
    Settings,
    HardHat,
    Hammer
} from "lucide-react";
import { LogoutButton } from "./components/logout-button";

export const metadata: Metadata = {
    title: "LASA Admin | Panel de Gestión",
    description: "Panel administrativo de Lasa Kitchens & Closets. Gestión de clientes, proyectos y facturación.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row font-sans">
            {/* Sidebar Desktop */}
            <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl hidden md:flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-display tracking-widest uppercase">
                        <span className="text-white">LASA</span>{' '}
                        <span className="text-[var(--accent-gold)] text-sm">ADMIN</span>
                    </h2>
                    <p className="text-xs text-white/40 mt-1">Carpintería Premium</p>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Inicio
                    </Link>
                    <Link href="/admin/consultations" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Calendar className="w-5 h-5" /> Consultas / Visitas
                    </Link>
                    <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Users className="w-5 h-5" /> Clientes
                    </Link>
                    <Link href="/admin/staff" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <HardHat className="w-5 h-5" /> Equipo Taller
                    </Link>
                    <Link href="/admin/invoices" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <FileText className="w-5 h-5" /> Finanzas
                    </Link>
                    <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                        <Hammer className="w-5 h-5" /> Proyectos
                    </Link>
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                            <Settings className="w-5 h-5" /> Configuración
                        </Link>
                    </div>
                </nav>
                <div className="p-4 border-t border-white/5 mt-auto">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors text-sm">
                        Volver al Sitio Web
                    </Link>
                    <LogoutButton />
                </div>
            </aside>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center p-3 z-50 safe-area-pb">
                <Link href="/admin" className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--accent-gold)] transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-medium">Inicio</span>
                </Link>
                <Link href="/admin/consultations" className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--accent-gold)] transition-colors">
                    <Calendar className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-medium">Visitas</span>
                </Link>
                <Link href="/admin/clients" className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--accent-gold)] transition-colors">
                    <Users className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-medium">Clientes</span>
                </Link>
                <Link href="/admin/staff" className="flex flex-col items-center gap-1 text-white/60 hover:text-[var(--accent-gold)] transition-colors">
                    <HardHat className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-medium">Equipo</span>
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <LogoutButton iconOnly />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-black to-[#111] pb-24 md:pb-0 h-screen">
                {children}
            </main>
        </div>
    );
}
