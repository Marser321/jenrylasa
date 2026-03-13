"use client";

import React, { useEffect, useState } from "react";

// Custom element type is defined in src/types/declarations.d.ts


interface ArViewerProps {
    src: string;
    poster?: string;
    alt?: string;
    className?: string;
}

export function ArViewer({ src, poster, alt = "3D Model", className }: ArViewerProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Dynamic import/registration of the web component could happen here
        import("@google/model-viewer").catch(console.error);
    }, []);

    if (!isMounted) {
        return (
            <div className={`flex items-center justify-center bg-transparent ${className}`}>
                <div className="text-muted-foreground animate-pulse">Loading AR...</div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full min-h-[400px] ${className}`}>
            <model-viewer
                src={src}
                poster={poster}
                alt={alt}
                shadow-intensity="1"
                camera-controls
                auto-rotate
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-orbit="0deg 75deg 105%"
                style={{ width: "100%", height: "100%" }}
            >
                <div slot="ar-button" className="absolute bottom-4 right-4">
                    <button className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition-transform">
                        View in Your Space
                    </button>
                </div>
            </model-viewer>
        </div>
    );
}
