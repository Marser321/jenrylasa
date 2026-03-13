"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Props ────────────────────────────────────────────────────
interface ScrollTextRevealProps {
    /** Contenido a revelar */
    children: React.ReactNode;
    /** Clase CSS para el contenedor */
    className?: string;
    /** Tag HTML del contenedor (default: "div") */
    as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
    /** Dirección de entrada: 'up', 'left', 'right' (default: 'up') */
    direction?: "up" | "left" | "right";
    /** Delay adicional en segundos (default: 0) */
    delay?: number;
    /** Duración de la animación en segundos (default: 0.8) */
    duration?: number;
}

/**
 * ScrollTextReveal v3 — Basado en IntersectionObserver + CSS
 *
 * Esta versión NO usa GSAP ScrollTrigger, evitando así la contención
 * con el loop de renderizado del ImageSequenceCanvas.
 * Usa CSS transitions/transforms que corren en el compositor thread
 * del GPU, sin bloquear el hilo principal.
 */
export function ScrollTextReveal({
    children,
    className,
    as: Tag = "div",
    direction = "up",
    delay = 0,
    duration = 0.8,
}: ScrollTextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Verificar si el usuario prefiere movimiento reducido
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            queueMicrotask(() => setIsVisible(true));
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
                // Cuando sale del viewport, reseteamos para que vuelva a animar
                if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                    setIsVisible(false);
                }
            },
            {
                // Trigger cuando el 15% del elemento es visible
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // ─── Calcular transform inicial según dirección ────────────
    const getInitialTransform = (): string => {
        switch (direction) {
            case "up":
                return "translateY(40px)";
            case "left":
                return "translateX(-60px)";
            case "right":
                return "translateX(60px)";
            default:
                return "translateY(40px)";
        }
    };

    return (
        <Tag
            ref={ref as React.RefObject<HTMLDivElement>}
            className={cn("scroll-text-reveal", className)}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translate3d(0, 0, 0)" : getInitialTransform(),
                transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                willChange: isVisible ? "auto" : "opacity, transform",
            }}
        >
            {children}
        </Tag>
    );
}
