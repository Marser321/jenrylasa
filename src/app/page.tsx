"use client";

import { ImageSequenceCanvas } from "@/components/scroll/ImageSequenceCanvas";
import { ScrollTextReveal } from "@/components/scroll/ScrollTextReveal";
import { GlassCard } from "@/components/ui/glass-card";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { ContactForm } from "@/components/ui/contact-form";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <WhatsAppButton />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 1. HERO — Cinematic Sequence + Brand Reveal
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-1"
          frameCount={240}
          className="h-[400vh]"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 text-center">
            <div className="pointer-events-auto">
              {/* Fondo sutil para legibilidad del texto */}
              <div className="px-10 py-8 rounded-xl bg-black/30 backdrop-blur-[2px]">
                <ScrollTextReveal direction="up" duration={1.2}>
                  <p className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase mb-6 text-[oklch(0.75_0.12_75)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Bespoke Millwork Studio
                  </p>
                </ScrollTextReveal>
                <ScrollTextReveal direction="up" delay={0.2} duration={1.2}>
                  <h1 className="text-hero text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-4">
                    LASA
                  </h1>
                </ScrollTextReveal>
                <ScrollTextReveal direction="up" delay={0.4} duration={1.2}>
                  <p className="text-xl md:text-2xl text-white/80 font-light tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Kitchens & Closets
                  </p>
                </ScrollTextReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 2. ABOUT — The Craft
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-2"
          frameCount={240}
          className="h-[400vh]"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-center justify-end p-6 md:p-20">
            <GlassCard className="pointer-events-auto max-w-md ml-auto border-l-2 border-l-[var(--accent-gold)]">
              <ScrollTextReveal>
                <p className="text-overline mb-4">Our Philosophy</p>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-normal mb-6 text-white tracking-tight">
                  Redefining Reflection.
                </h2>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.2}>
                <p className="text-white/50 leading-relaxed text-lg font-light">
                  We don&apos;t just build cabinets. We sculpt light and space.
                  Our signature <strong className="text-white/80">Liquid Glass</strong> finish
                  merges the warmth of wood with the ethereal precision of mirror.
                </p>
              </ScrollTextReveal>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 3. KITCHENS
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="kitchens" className="relative">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-3"
          frameCount={240}
          className="h-[400vh]"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-center justify-start p-6 md:p-20">
            <GlassCard className="pointer-events-auto max-w-md border-r-2 border-r-[var(--accent-gold)]">
              <ScrollTextReveal>
                <p className="text-overline mb-4">Kitchens</p>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-normal mb-6 text-white tracking-tight">
                  The Culinary Stage.
                </h2>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.2}>
                <p className="text-white/50 leading-relaxed text-lg font-light">
                  High-gloss surfaces that mirror your culinary artistry.
                  Seamless integration. Timeless elegance. A kitchen that
                  performs as beautifully as it looks.
                </p>
              </ScrollTextReveal>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 4. CLOSETS
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="closets" className="relative">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-4"
          frameCount={240}
          className="h-[400vh]"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-end justify-center p-6 md:p-20 pb-20">
            <GlassCard className="pointer-events-auto max-w-2xl text-center border-t-2 border-t-[var(--accent-gold)]">
              <ScrollTextReveal>
                <p className="text-overline mb-4">Closets</p>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-normal mb-6 text-white tracking-tight">
                  Your Personal Boutique.
                </h2>
              </ScrollTextReveal>
              <ScrollTextReveal delay={0.2}>
                <p className="text-white/50 leading-relaxed text-lg font-light">
                  Storage, elevated to an art form.
                  Walk-in closets designed with boutique sensibilities,
                  where every garment is reflected in luxury.
                </p>
              </ScrollTextReveal>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 5. PRECISION — Single Word Statement
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-5"
          frameCount={240}
          className="h-[400vh]"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center p-6">
            <ScrollTextReveal duration={1.5}>
              <h2 className="text-hero text-white tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-10 relative">
                Precision.
              </h2>
            </ScrollTextReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 6. PROJECTS GALLERY — Horizontal Scroll
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 6. PROJECTS GALLERY — Horizontal Scroll
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ProjectGallery />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * SPACER — Transition
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="h-screen w-full bg-transparent" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 7. CONTACT — Final CTA
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="contact" className="relative z-20 bg-[var(--bg-void)]">
        <ImageSequenceCanvas
          sequencePath="/scroll/sequence-7"
          frameCount={240}
          className="h-[300vh]"
        />
        <div className="absolute inset-0 pointer-events-none">
          {/* Se usa min-h-[100dvh] para permitir scroll de sobrepaso si el cel es chico */}
          <div className="sticky top-0 min-h-[100dvh] max-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-md overflow-y-auto overscroll-contain">
            <div className="pointer-events-auto w-full py-20 md:py-0 flex items-center justify-center">
              <ScrollTextReveal className="w-full max-w-2xl">
                <ContactForm className="mx-auto" />
              </ScrollTextReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * 8. FOOTER
       * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="relative z-10 border-t border-white/10 bg-[var(--bg-void)] py-6">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-white/20 font-light tracking-wider">
            © {new Date().getFullYear()} Lasa Kitchens &amp; Closets. All rights reserved.
          </p>
          {/* Botón camuflado para admin */}
          <a
            href="/login"
            className="text-[10px] text-white/5 hover:text-white/30 transition-colors uppercase tracking-widest font-mono"
            title="System Access"
          >
            SYS L-GI
          </a>
        </div>
      </footer>
    </main>
  );
}
