"use client";

import { useEffect, useRef, useState, createContext, useContext, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LENIS_CONFIG } from "@/lib/animations";

// Registramos ScrollTrigger una sola vez
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Context ──────────────────────────────────────────────────
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
    return useContext(LenisContext);
}

// ─── Provider ─────────────────────────────────────────────────
interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    useEffect(() => {
        // Respetar preferencias de accesibilidad
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        // Inicializar Lenis
        const lenis = new Lenis({
            ...LENIS_CONFIG,
        });

        lenisRef.current = lenis;
        queueMicrotask(() => setLenisInstance(lenis));

        // Sincronizar Lenis con GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        const ticker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(ticker);

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
            queueMicrotask(() => setLenisInstance(null));
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
}
