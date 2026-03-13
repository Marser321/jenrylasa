"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projectImages = [
    "0149a55d7541c7fd66cfd6ffca1e352a.webp",
    "07d02842aa45d5559dd0d03d81b931e2.webp",
    "0903a23ca4ad1b7babd7c49faecd1716.webp",
    "0be05ae0d80124e9ab34e8ce03d04dbe.webp",
    "0d7804f55a30882c1f1f4534a176a8c7.webp",
    "0e579aab71a5836a7111ed45325b0150.webp",
    "11a39fb78f44f1d53d020b6775a0c470.webp",
    "172379d4f7aef13d67b6d73e17e42335.webp",
    "19a3c564b4b36e064d28ddc89496dee2.webp",
    "24aff655e5e3a0e701e0884374168e7d.webp",
    "2d3bb1811a344cf5ce0e6750646e0756.webp",
    "32fc0cc72c26d23120a1a6d7964d22bb.webp",
    "454876c7d3eef3bce5132269a31877a2.webp",
    "49e9a2c417c02a7bc9a7da828d56508a.webp",
    "4eba01ceae6b8ce48e0a2aa8ed999b48.webp",
    "52d34da26f8921250b639404dc007c45.webp",
    "5d4e0177d547eb95eaded30b8a27b8a0.webp",
    "69122d46a8f20e780d42381d52c3ea16.webp",
    "69e7daac392c953a63376930ede1d668.webp",
    "6f07ea0cac31c332884dd4128121fc40.webp",
    "71fb96aa970799fc70b6cb6333694471.webp",
    "740e1da377f2d40f08cafe778f2cd799.webp",
    "7c7aaf2195f2fce071a37c8356c08aff.webp",
    "805c8019115c0b996687cd5d55a7a7f8.webp",
    "82bb1a9fa3cfe12ee9030065c562440a.webp",
    "83a6efcbad1a95dc44db40bfe42b79bb.webp",
    "88d5f5ae6473cc45a78138b803239eb4.webp",
    "88f6482238cb70073da5b6132b19c6bb.webp",
    "8a77c20e95a33103e25ebf25991aeaf3.webp",
    "96837ecf5585a9d159c25b663908db50.webp",
    "9c35c303896ed37b1e9130a81acd027b.webp",
    "a2621ff60d2747a92a92369c7c3131a0.webp",
    "a36c4dc72ab4414c12e9596c283c5424.webp",
    "a7896af9d109e6e838bcb65cf4045f7c.webp",
    "a83d0d60e6637d9afbb666194357f704.webp",
    "ae597b4b6982ba7a44c0e492d2d6910a.webp",
    "b216e22451f99e84c4e247dd5d9657de.webp",
    "b48ee2a8cb7ce2bedea68c5f6a0adee6.webp",
    "b8985a8ab955723873c71977530f86ee.webp",
    "c4df6cfbec95f1a0f19166053cf75455.webp",
    "d612ec9d406a02ac87e2565ad3439492.webp",
    "d677d649b72326f2e6eb2aee0e1ffd21.webp",
    "d6fa11035788a58e93c1054e5e3ca25d.webp",
    "d790f31c13613d10b4cf9d735106327e.webp",
    "df27ee78d154585c99e0b39adc3c56fd.webp",
    "dfe4558fc7987b8e3290e26cc1dacf5a.webp",
    "e1e753bae042554916d9ae733fb62962.webp",
    "ea74e47cd9f2904e2f695caf3d3cddbf.webp",
    "f0ef368c7d3bd4c146e4d1f42c175fc4.webp",
    "f2632b804ef2bfadc927cfd213626412.webp",
    "f52218f5d278f595f4ec6761cf8d0048.webp",
    "f5bbabca8f1f1a57d6cace0b9960bbba.webp",
];

/**
 * ProjectGallery v2 — GSAP Horizontal Scroll
 * Galería horizontal atada al scroll vertical con efecto parallax por card.
 */
export function ProjectGallery({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !trackRef.current) return;

            const track = trackRef.current;
            // Calcular cuánto hay que mover: ancho total del track - ancho visible
            const scrollWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth + window.innerHeight * 1.5}`, // Increased buffer for more "lateral scroll" time
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Parallax por card individual
            const cards = track.querySelectorAll(".gallery-card");
            cards.forEach((card) => {
                const inner = card.querySelector(".gallery-inner");
                if (!inner) return;

                gsap.fromTo(
                    inner,
                    { scale: 0.92, opacity: 0.6 },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: gsap.getById("galleryScroll") || undefined,
                            start: "left right",
                            end: "left center",
                            scrub: true,
                        },
                    }
                );
            });
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="projects"
            ref={containerRef}
            className={cn("relative overflow-hidden bg-[var(--bg-void)]", className)}
        >
            {/* Track horizontal */}
            <div ref={trackRef} className="flex items-center gap-6 px-10 h-screen">
                {/* Título como primera "card" */}
                <div className="flex-shrink-0 w-[40vw] md:w-[30vw] flex flex-col justify-center pr-8">
                    <p className="text-overline mb-4">Portfolio</p>
                    <h2 className="text-hero text-white mb-6">Master&shy;pieces</h2>
                    <p className="text-lg text-white/50 font-light leading-relaxed max-w-sm">
                        Explore our collection of bespoke joinery and functional art.
                    </p>
                </div>

                {/* Cards de proyectos */}
                {projectImages.map((src, i) => (
                    <div
                        key={i}
                        className="gallery-card relative flex-shrink-0 h-[60vh] w-[40vh] md:h-[70vh] md:w-[50vh] overflow-hidden rounded-2xl"
                    >
                        <div className="gallery-inner relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-700 z-10" />
                            <Image
                                src={`/images/projects/${src}`}
                                alt={`Project ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 40vh, 50vh"
                                className="object-cover transition-transform duration-700 hover:scale-110"
                                loading="lazy"
                            />

                            {/* Número del proyecto */}
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* CTA final */}
                <div className="flex-shrink-0 w-[30vw] flex flex-col items-center justify-center">
                    <a
                        href="#contact"
                        className="group flex flex-col items-center gap-4 text-white/40 hover:text-white transition-colors duration-500"
                    >
                        <span className="text-overline">Ready to Start?</span>
                        <span className="text-4xl font-light tracking-tight">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
