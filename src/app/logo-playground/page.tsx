"use client";

import React, { useState } from "react";
import { DynamicLogo } from "@/components/ui/DynamicLogo";

const GOLD_TONES = [
    { name: "Original Gold", value: "#C9A227" },
    { name: "Antique Gold", value: "#B8860B" },
    { name: "Soft Gold", value: "#D4AF37" },
    { name: "Bright Gold", value: "#FFD700" },
    { name: "Bronze Gold", value: "#CD7F32" },
];

const FONTS = [
    { name: "Cinzel (Classic)", value: "'Cinzel', serif" },
    { name: "Playfair Display", value: "'Playfair Display', serif" },
    { name: "Bodoni Moda", value: "'Bodoni Moda', serif" },
    { name: "Cormorant", value: "'Cormorant Garamond', serif" },
    { name: "Prata", value: "'Prata', serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif" },
];

const BACKGROUNDS = [
    { name: "Dark", value: "#000000" },
    { name: "Charcoal", value: "#1A1A1A" },
    { name: "White", value: "#FFFFFF" },
    { name: "Grey", value: "#F5F5F5" },
];

export default function LogoPlayground() {
    const [goldColor, setGoldColor] = useState(GOLD_TONES[0].value);
    const [lasaTextColor, setLasaTextColor] = useState("#4A3728");
    const [bgColor, setBgColor] = useState(BACKGROUNDS[0].value);
    const [fontFamily, setFontFamily] = useState(FONTS[0].value);

    return (
        <div className="min-h-screen p-8 font-sans transition-colors duration-300" style={{ backgroundColor: bgColor }}>
            {/* Load Google Fonts */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Prata&display=swap');
            `}</style>

            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className={cn("text-4xl font-bold", bgColor === "#FFFFFF" || bgColor === "#F5F5F5" ? "text-black" : "text-white")}>
                        Logo Playground
                    </h1>
                    <p className={cn("opacity-70", bgColor === "#FFFFFF" || bgColor === "#F5F5F5" ? "text-black" : "text-white")}>
                        Experiment with typography, centering, and golden tones for the LASA logo.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Controls */}
                    <div className="w-full md:w-80 space-y-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Typography</h2>
                            <div className="grid grid-cols-1 gap-2">
                                {FONTS.map((font) => (
                                    <button
                                        key={font.value}
                                        onClick={() => setFontFamily(font.value)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm text-left transition-all border",
                                            fontFamily === font.value 
                                                ? "bg-white text-black border-white" 
                                                : "bg-white/5 text-white border-white/10 hover:border-white/30"
                                        )}
                                        style={{ fontFamily: font.value.split(',')[0] }}
                                    >
                                        {font.name}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Gold Tone</h2>
                            <div className="grid grid-cols-5 gap-2">
                                {GOLD_TONES.map((tone) => (
                                    <button
                                        key={tone.value}
                                        onClick={() => setGoldColor(tone.value)}
                                        className={cn(
                                            "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                            goldColor === tone.value ? "border-white" : "border-transparent"
                                        )}
                                        style={{ backgroundColor: tone.value }}
                                        title={tone.name}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">LASA Text Color</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setLasaTextColor("#4A3728")}
                                    className={cn(
                                        "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        lasaTextColor === "#4A3728" ? "bg-white text-black" : "bg-white/10 text-white"
                                    )}
                                >
                                    Navy
                                </button>
                                <button
                                    onClick={() => setLasaTextColor("#FFFFFF")}
                                    className={cn(
                                        "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        lasaTextColor === "#FFFFFF" ? "bg-white text-black" : "bg-white/10 text-white"
                                    )}
                                >
                                    White
                                </button>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Background</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {BACKGROUNDS.map((bg) => (
                                    <button
                                        key={bg.value}
                                        onClick={() => setBgColor(bg.value)}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                                            bgColor === bg.value 
                                                ? "bg-white text-black border-white" 
                                                : "bg-transparent text-white border-white/20 hover:border-white/50"
                                        )}
                                    >
                                        {bg.name}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Logo Display */}
                    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white/5 rounded-3xl border border-white/10 min-h-[500px] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div id="logo-container">
                            <DynamicLogo 
                                className="w-full max-w-[400px]" 
                                goldColor={goldColor} 
                                lasaTextColor={lasaTextColor}
                                fontFamily={fontFamily}
                            />
                        </div>
                        
                        <div className="mt-12 flex flex-wrap gap-4 justify-center">
                            <button 
                                onClick={() => {
                                    const svgElement = document.querySelector('#logo-container svg') as SVGElement;
                                    if (svgElement) {
                                        // Clone the SVG to manipulate it for export
                                        const clone = svgElement.cloneNode(true) as SVGElement;
                                        
                                        // Embed styles directly for external compatibility
                                        const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
                                        style.textContent = `
                                            .dyn-gold { fill: ${goldColor}; stroke: ${goldColor}; }
                                            .dyn-navy { fill: #4A3728; stroke: #4A3728; }
                                            .dyn-text-large { font-family: ${fontFamily}; font-size: 89.19px; font-weight: 700; fill: ${lasaTextColor}; }
                                            .dyn-text-small { font-family: 'Inter', sans-serif; font-size: 16.99px; font-weight: 700; fill: #ffffff; letter-spacing: 0.25em; text-transform: uppercase; }
                                        `;
                                        clone.prepend(style);

                                        const svgData = new XMLSerializer().serializeToString(clone);
                                        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                                        const svgUrl = URL.createObjectURL(svgBlob);
                                        const downloadLink = document.createElement("a");
                                        downloadLink.href = svgUrl;
                                        downloadLink.download = `lasa-logo-fixed.svg`;
                                        document.body.appendChild(downloadLink);
                                        downloadLink.click();
                                        document.body.removeChild(downloadLink);
                                        URL.revokeObjectURL(svgUrl);
                                    }
                                }}
                                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 border border-white/20 shadow-lg"
                            >
                                Download SVG
                            </button>

                            <button 
                                onClick={() => {
                                    const svgElement = document.querySelector('#logo-container svg') as SVGElement;
                                    if (svgElement) {
                                        const canvas = document.createElement('canvas');
                                        const size = 2000; // High resolution
                                        canvas.width = size;
                                        canvas.height = size;
                                        const ctx = canvas.getContext('2d');
                                        
                                        if (ctx) {
                                            // Embed styles into the SVG before drawing to canvas
                                            const clone = svgElement.cloneNode(true) as SVGElement;
                                            const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
                                            style.textContent = `
                                                .dyn-gold { fill: ${goldColor}; stroke: ${goldColor}; }
                                                .dyn-navy { fill: #4A3728; stroke: #4A3728; }
                                                .dyn-text-large { font-family: ${fontFamily}; font-size: 89.19px; font-weight: 700; fill: ${lasaTextColor}; }
                                                .dyn-text-small { font-family: 'Inter', sans-serif; font-size: 16.99px; font-weight: 700; fill: #ffffff; letter-spacing: 0.25em; text-transform: uppercase; }
                                            `;
                                            clone.prepend(style);

                                            const svgData = new XMLSerializer().serializeToString(clone);
                                            const img = new Image();
                                            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                                            const url = URL.createObjectURL(svgBlob);
                                            
                                            img.onload = () => {
                                                ctx.clearRect(0, 0, size, size);
                                                ctx.drawImage(img, 0, 0, size, size);
                                                const pngUrl = canvas.toDataURL('image/png');
                                                const downloadLink = document.createElement('a');
                                                downloadLink.href = pngUrl;
                                                downloadLink.download = `lasa-logo-fixed.png`;
                                                document.body.appendChild(downloadLink);
                                                downloadLink.click();
                                                document.body.removeChild(downloadLink);
                                                URL.revokeObjectURL(url);
                                            };
                                            img.src = url;
                                        }
                                    }
                                }}
                                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-white/20"
                            >
                                Download PNG (2k)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function for class names
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
