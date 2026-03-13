"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

/**
 * Header v3.1 — Fix Final de Hooks y Redirección
 * - Mantiene el estado persistente entre rutas.
 * - Solo se oculta visualmente en /admin.
 */
export function Header() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const threshold = 100;

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > 50);

            if (currentY > threshold) {
                if (currentY > lastScrollY.current + 5) {
                    setIsVisible(false);
                    setIsMobileMenuOpen(false);
                } else if (currentY < lastScrollY.current - 5) {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        setIsMobileMenuOpen(false);
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }, []);

    const navLinks = [
        { href: "#kitchens", label: "Kitchens" },
        { href: "#closets", label: "Closets" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];

    // IMPORTANTE: El early return para /admin DEBE ir después de todos los hooks.
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/invoice')) {
        return null;
    }

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-500",
                    "ease-[var(--ease-luxury)]",
                    isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
                    isScrolled ? "border-b border-white/10 bg-black/60 backdrop-blur-xl" : "bg-transparent"
                )}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <Logo className="h-14 w-auto" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-xs font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="p-2 text-white/40 hover:text-white transition-colors" title="Acceso Administrativo">
                            <User className="w-5 h-5" />
                        </Link>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, "#contact")}
                            className="px-6 py-2.5 text-xs font-medium tracking-[0.1em] uppercase border border-white/20 rounded-sm text-white/80 hover:text-black hover:bg-white transition-all duration-300"
                        >
                            Get a Quote
                        </a>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        className="md:hidden p-2 text-white/60 hover:text-white relative w-8 h-8"
                    >
                        <span className={cn("absolute left-1 w-6 h-px bg-current transition-all duration-300", isMobileMenuOpen ? "top-1/2 rotate-45" : "top-[10px]")} />
                        <span className={cn("absolute left-1 top-1/2 w-6 h-px bg-current transition-all duration-300", isMobileMenuOpen ? "opacity-0" : "opacity-100")} />
                        <span className={cn("absolute left-1 w-6 h-px bg-current transition-all duration-300", isMobileMenuOpen ? "top-1/2 -rotate-45" : "bottom-[10px]")} />
                    </button>
                </div>
            </header>

            <div className={cn(
                "fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                {navLinks.map((link, i) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="text-2xl font-light tracking-[0.2em] uppercase text-white/80 hover:text-white transition-all duration-300"
                        style={{ transitionDelay: isMobileMenuOpen ? `${i * 80}ms` : "0ms" }}
                    >
                        {link.label}
                    </a>
                ))}
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest uppercase mt-4">
                    <User className="w-4 h-4" /> Acceso Admin
                </Link>
            </div>
        </>
    );
}
