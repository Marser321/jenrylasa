/**
 * Presets de animación GSAP para Henry Kitchen & Closet
 * Curvas bezier de "Micro-Lujo" — estilo Apple/Awwwards
 */

// ─── Curvas de Easing CSS ─────────────────────────────────────
export const EASE = {
    /** Transiciones UI: hover, entrada de cards */
    luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
    /** Scroll-driven: canvas frames */
    smooth: 'cubic-bezier(0.33, 0, 0, 1)',
    /** Micro-interacciones: press de botón */
    bounceSoft: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Transiciones de página */
    dramatic: 'cubic-bezier(0.7, 0, 0.3, 1)',
} as const;

// ─── Duraciones ───────────────────────────────────────────────
export const DURATION = {
    instant: 0.1,
    fast: 0.25,
    normal: 0.5,
    slow: 0.8,
    cinematic: 1.2,
} as const;

// ─── Presets GSAP ─────────────────────────────────────────────
export const GSAP_PRESETS = {
    /** ScrollTrigger: convierte scroll en progreso 0→1 */
    scrollScrub: {
        ease: 'none',
        scrub: 0.5,
    },

    /** Reveal de texto línea por línea */
    textReveal: {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
    },

    /** Entrada de cards al viewport */
    cardReveal: {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.15,
    },

    /** Fade-in genérico */
    fadeIn: {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
    },

    /** Header: threshold de scroll para auto-hide (px) */
    headerHideThreshold: 100,
} as const;

// ─── Lenis Config ─────────────────────────────────────────────
export const LENIS_CONFIG = {
    lerp: 0.075,
    duration: 1.2,
    orientation: 'vertical' as const,
    smoothWheel: true,
    touchMultiplier: 1.5,
} as const;
