import { create } from "zustand";

/**
 * Store global de estado de scroll.
 * Usado por el Cinematic Scroll System para comunicar progreso
 * entre componentes (Header, secciones, overlays).
 */
interface ScrollState {
    /** Progreso global del scroll (0 a 1) */
    scrollProgress: number;
    /** Sección actualmente visible */
    activeSection: string;
    /** Si el header debería estar visible */
    headerVisible: boolean;
    /** Dirección del scroll: 'up' o 'down' */
    scrollDirection: "up" | "down";

    // Acciones
    setScrollProgress: (progress: number) => void;
    setActiveSection: (section: string) => void;
    setHeaderVisible: (visible: boolean) => void;
    setScrollDirection: (direction: "up" | "down") => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    scrollProgress: 0,
    activeSection: "hero",
    headerVisible: true,
    scrollDirection: "down",

    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setActiveSection: (section) => set({ activeSection: section }),
    setHeaderVisible: (visible) => set({ headerVisible: visible }),
    setScrollDirection: (direction) => set({ scrollDirection: direction }),
}));
