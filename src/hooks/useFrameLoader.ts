"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Estrategia de carga progresiva de frames para el canvas cinematográfico.
 *
 * Fase 1: Preload crítico (frames 0–49) — bloquea hasta completar
 * Fase 2: Background load (frames 50–149) — requestIdleCallback
 * Fase 3: Lazy load (frames 150+) — bajo demanda según scroll
 */

interface UseFrameLoaderOptions {
    /** Ruta base (e.g., "/scroll/sequence-1") */
    sequencePath: string;
    /** Cantidad total de frames */
    frameCount: number;
    /** Prefijo del nombre de archivo */
    fileNamePrefix?: string;
    /** Extensión del archivo (sin punto) */
    format?: "png" | "webp";
    /** Cantidad de dígitos para padding (e.g., 3 → "001") */
    digits?: number;
    /** Cantidad de frames de preload crítico (fase 1) */
    criticalCount?: number;
}

interface UseFrameLoaderResult {
    /** Array de imágenes cargadas (puede tener huecos null) */
    frames: (HTMLImageElement | null)[];
    /** Si los frames críticos (fase 1) están listos */
    isReady: boolean;
    /** Progreso de carga total (0 a 1) */
    loadProgress: number;
    /** Pide cargar un frame específico (para lazy loading) */
    requestFrame: (index: number) => void;
}

export function useFrameLoader({
    sequencePath,
    frameCount,
    fileNamePrefix = "ezgif-frame-",
    format = "webp",
    digits = 3,
    criticalCount = 50,
}: UseFrameLoaderOptions): UseFrameLoaderResult {
    const [frames, setFrames] = useState<(HTMLImageElement | null)[]>(
        () => new Array(frameCount).fill(null)
    );
    const [isReady, setIsReady] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);

    const framesRef = useRef<(HTMLImageElement | null)[]>(
        new Array(frameCount).fill(null)
    );
    const loadingSet = useRef<Set<number>>(new Set());

    const getFrameUrl = useCallback(
        (index: number) => {
            const fileIndex = index + 1;
            const paddedIndex = String(fileIndex).padStart(digits, "0");
            return `${sequencePath}/${fileNamePrefix}${paddedIndex}.${format}`;
        },
        [sequencePath, fileNamePrefix, format, digits]
    );

    const loadFrame = useCallback(
        (index: number): Promise<HTMLImageElement | null> => {
            if (framesRef.current[index]) return Promise.resolve(framesRef.current[index]);
            if (loadingSet.current.has(index)) return Promise.resolve(null); // Already loading

            loadingSet.current.add(index);

            return new Promise((resolve) => {
                const img = new Image();
                img.src = getFrameUrl(index);
                img.onload = () => {
                    framesRef.current[index] = img;
                    loadingSet.current.delete(index);
                    setLoadedCount((prev) => prev + 1);
                    resolve(img);
                };
                img.onerror = () => {
                    loadingSet.current.delete(index);
                    console.error(`Failed to load frame ${index}`);
                    resolve(null);
                };
            });
        },
        [getFrameUrl]
    );

    // Initial Load & Background Load
    useEffect(() => {
        let isMounted = true;

        const loadSequence = async () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const isSaveData = 'connection' in navigator && (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;
            const actualCriticalCount = isMobile ? Math.min(criticalCount, 15) : criticalCount;

            // 1. Critical Phase (Blocking-ish)
            const batchSize = 5;
            for (let i = 0; i < Math.min(actualCriticalCount, frameCount); i += batchSize) {
                const batchPromises = [];
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batchPromises.push(loadFrame(j));
                }
                await Promise.all(batchPromises);
                if (!isMounted) return;
                // Update state after each batch to show progress
                setFrames([...framesRef.current]);
            }

            setIsReady(true);

            // Si es móvil o tiene ahorro de datos, no hacemos carga agresiva en background.
            // Dependeremos del lazy-loading en onUpdate de ScrollTrigger.
            if (isMobile || isSaveData) {
                return;
            }

            // 2. Background Phase (Non-blocking)
            // Load remaining frames in larger batches, yielding to main thread
            const backgroundStart = Math.min(actualCriticalCount, frameCount);

            const processNextBatch = (startIndex: number) => {
                if (startIndex >= frameCount) return;
                if (!isMounted) return;

                const nextBatchSize = 10;
                const batchPromises = [];

                for (let i = startIndex; i < Math.min(startIndex + nextBatchSize, frameCount); i++) {
                    // Check if already loaded by requestFrame
                    if (!framesRef.current[i]) {
                        batchPromises.push(loadFrame(i));
                    }
                }

                Promise.all(batchPromises).then(() => {
                    if (isMounted) {
                        // Only update state occasionally to avoid thrashing
                        if (startIndex % 50 === 0 || startIndex >= frameCount - nextBatchSize) {
                            setFrames([...framesRef.current]);
                        }

                        // Schedule next batch
                        if ("requestIdleCallback" in window) {
                            window.requestIdleCallback(() => processNextBatch(startIndex + nextBatchSize));
                        } else {
                            setTimeout(() => processNextBatch(startIndex + nextBatchSize), 50);
                        }
                    }
                });
            };

            processNextBatch(backgroundStart);
        };

        loadSequence();

        return () => {
            isMounted = false;
        };
    }, [sequencePath, frameCount, criticalCount]); // Removed loadFrame dependence to strictly run once per config change

    // On-demand loader (High Priority)
    const requestFrame = useCallback(
        (index: number) => {
            if (index >= 0 && index < frameCount && !framesRef.current[index] && !loadingSet.current.has(index)) {
                loadFrame(index).then(() => {
                    setFrames([...framesRef.current]);
                });

                // Preload immediate neighbors (reducido a 2 en vez de 5 para ahorrar datos en móviles)
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                const lookAhead = isMobile ? 2 : 5;
                for (let i = 1; i <= lookAhead; i++) {
                    if (index + i < frameCount && !framesRef.current[index + i]) loadFrame(index + i);
                }
            }
        },
        [frameCount, loadFrame]
    );

    return {
        frames,
        isReady,
        loadProgress: frameCount > 0 ? loadedCount / frameCount : 0,
        requestFrame,
    };
}
