---
description: Reglas de diseño "Micro-Lujo" para Henry Kitchen & Closet. Aplican a todos los componentes y páginas del sitio.
---

# 🎨 Design System: Micro-Lujo — Henry Kitchen & Closet

> Filosofía: **"El lujo es espacio negativo, movimiento intencional y materiales nobles."**

---

## 1. Paleta de Colores

### Colores Base (Dark Mode por defecto)

| Token | Valor OKLCH | Hex Aprox. | Uso |
|---|---|---|---|
| `--bg-void` | `oklch(0.08 0 0)` | `#131313` | Fondo principal (más oscuro que negro puro) |
| `--bg-surface` | `oklch(0.12 0 0)` | `#1a1a1a` | Cards, paneles |
| `--bg-elevated` | `oklch(0.16 0 0)` | `#242424` | Popovers, modales |
| `--text-primary` | `oklch(0.97 0 0)` | `#f5f5f5` | Títulos, texto principal |
| `--text-secondary` | `oklch(0.65 0 0)` | `#999999` | Subtítulos, descripciones |
| `--text-muted` | `oklch(0.45 0 0)` | `#666666` | Placeholders, labels menores |

### Colores de Acento

| Token | Valor OKLCH | Hex Aprox. | Uso |
|---|---|---|---|
| `--accent-gold` | `oklch(0.75 0.12 75)` | `#C4A35A` | CTA principal, precio, orgullo |
| `--accent-gold-soft` | `oklch(0.75 0.12 75 / 15%)` | — | Hover backgrounds, glows |
| `--accent-warm` | `oklch(0.70 0.08 50)` | `#B8956A` | Madera, calidez |
| `--accent-ice` | `oklch(0.85 0.03 230)` | `#C8D5E0` | Vidrio, reflejos fríos |

### Glassmorphism

| Token | Valor | Uso |
|---|---|---|
| `--glass-bg` | `oklch(0.15 0 0 / 40%)` | Fondo de glass cards |
| `--glass-border` | `oklch(1 0 0 / 12%)` | Borde sutil de vidrio |
| `--glass-glow` | `oklch(1 0 0 / 5%)` | Resplandor hover |
| `--glass-blur` | `16px` | Nivel de backdrop-blur |

---

## 2. Tipografía

### Fuentes

| Rol | Fuente | Fallback | Importación |
|---|---|---|---|
| **Display / Títulos** | **Cinzel** | `Georgia, 'Times New Roman', serif` | Google Fonts |
| **Body / UI** | **Inter** | `system-ui, -apple-system, sans-serif` | Google Fonts (Variable) |
| **Monospace / Datos** | **JetBrains Mono** | `'Courier New', monospace` | Google Fonts |

### Escala Tipográfica

> Basada en **Major Third (1.25)** con ajustes para mobile-first.

| Nivel | Mobile | Desktop | Weight | Letter Spacing | Fuente |
|---|---|---|---|---|---|
| `hero` | `3rem` (48px) | `6rem` (96px) | 400 | `-0.04em` | Cinzel |
| `h1` | `2.25rem` (36px) | `4rem` (64px) | 400 | `-0.03em` | Cinzel |
| `h2` | `1.75rem` (28px) | `3rem` (48px) | 400 | `-0.02em` | Cinzel |
| `h3` | `1.25rem` (20px) | `1.75rem` (28px) | 600 | `-0.01em` | Inter |
| `body-lg` | `1.125rem` (18px) | `1.25rem` (20px) | 300 | `0` | Inter |
| `body` | `1rem` (16px) | `1rem` (16px) | 400 | `0` | Inter |
| `caption` | `0.875rem` (14px) | `0.875rem` (14px) | 400 | `0.02em` | Inter |
| `overline` | `0.75rem` (12px) | `0.75rem` (12px) | 500 | `0.15em` | Inter |

### Reglas Tipográficas

- **Títulos Cinzel**: Siempre `uppercase` con tracking negativo
- **Body Inter**: `font-weight: 300` (Light) para textos largos — el "lujo es ligereza"
- **Overlines**: `uppercase`, `tracking-[0.15em]`, `text-muted` — estilo "editorial de revista"
- **Máximo**: 65 caracteres por línea (`max-w-[65ch]`) para legibilidad óptima

---

## 3. Espaciado — "El Lujo es Espacio Negativo"

### Sistema de Espaciado (rem)

> Escala generosa. Un sitio de lujo NUNCA se siente "apretado".

| Token | Valor | Uso |
|---|---|---|
| `--space-xs` | `0.5rem` (8px) | Padding mínimo interno |
| `--space-sm` | `1rem` (16px) | Gap entre elementos inline |
| `--space-md` | `2rem` (32px) | Padding de cards, gap de grid |
| `--space-lg` | `4rem` (64px) | Separación entre bloques |
| `--space-xl` | `8rem` (128px) | Separación entre secciones |
| `--space-2xl` | `12rem` (192px) | Margen hero, espacio de respiro máximo |

### Reglas de Espaciado

1. **Secciones**: Mínimo `--space-xl` (128px) entre secciones del landing
2. **Cards**: `padding: --space-md` interno, `gap: --space-sm` entre ellas
3. **Texto**: `margin-bottom: --space-lg` después de un `<h2>` antes del párrafo
4. **Mobile**: Los espacios se reducen un 50% hasta `md:` breakpoint

---

## 4. Animaciones — Curvas Bézier de Lujo

### Curvas de Easing

| Nombre | Valor CSS | Uso |
|---|---|---|
| `--ease-luxury` | `cubic-bezier(0.16, 1, 0.3, 1)` | Transiciones de UI (hover, entrada) |
| `--ease-smooth` | `cubic-bezier(0.33, 0, 0, 1)` | Scroll-driven (canvas frames) |
| `--ease-bounce-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interacciones (botón press) |
| `--ease-dramatic` | `cubic-bezier(0.7, 0, 0.3, 1)` | Cambios de página, transiciones grandes |

### Duraciones

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | `100ms` | Hover de opacidad |
| `--duration-fast` | `250ms` | Hover de elementos UI |
| `--duration-normal` | `500ms` | Apariciones, transiciones de estado |
| `--duration-slow` | `800ms` | Entrada de secciones al viewport |
| `--duration-cinematic` | `1200ms` | Animaciones hero, reveals de texto |

### Reglas de Animación

1. **Scroll-driven** (GSAP): `scrub: 0.5` para efecto Apple-like (ni instantáneo ni pegajoso)
2. **Entrada al viewport**: `opacity: 0 → 1`, `translateY: 40px → 0`, `duration: --duration-slow`
3. **Hover Cards**: `scale: 1 → 1.02`, `duration: --duration-fast`, `ease: --ease-luxury`
4. **Nunca**: Animaciones que duren más de 1.5s para interacciones directas
5. **Respeto**: `@media (prefers-reduced-motion: reduce)` → desactivar TODAS las animaciones de scroll

### GSAP Presets (para `animations.ts`)

```typescript
export const GSAP_PRESETS = {
  // Para ScrollTrigger scrub
  scrollScrub: { ease: "none", scrub: 0.5 },
  
  // Reveal de texto (SplitText por línea)
  textReveal: {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.08,
  },
  
  // Card entrance
  cardReveal: {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.15,
  },
  
  // Header auto-hide threshold
  headerHideThreshold: 100, // px scrolled before hiding
} as const;
```

---

## 5. Bordes, Sombras y Efectos

### Bordes

| Estilo | Valor | Uso |
|---|---|---|
| Default | `1px solid oklch(1 0 0 / 10%)` | Cards, separadores |
| Hover | `1px solid oklch(1 0 0 / 20%)` | Estado hover |
| Accent | `1px solid var(--accent-gold) / 30%` | Card seleccionada o feature |
| None | `border: none` | Imágenes, canvas, backgrounds |

### Sombras

| Nombre | Valor | Uso |
|---|---|---|
| `--shadow-glass` | `0 8px 32px oklch(0 0 0 / 40%)` | Glass cards |
| `--shadow-glow` | `0 0 60px oklch(1 0 0 / 5%)` | Hover glow sutil |
| `--shadow-gold` | `0 0 40px oklch(0.75 0.12 75 / 15%)` | CTA buttons, accent elements |

### Border Radius

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `8px` | Inputs, botones pequeños |
| `--radius-md` | `12px` | Cards, contenedores |
| `--radius-lg` | `20px` | Feature cards, galería |
| `--radius-full` | `9999px` | Pills, badges, avatars |

---

## 6. Responsive — Mobile-First

### Breakpoints

| Token | Valor | Dispositivo |
|---|---|---|
| `sm` | `640px` | Teléfonos grandes |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktop |
| `2xl` | `1536px` | Monitores grandes |

### Reglas Mobile-First

1. **Canvas Scroll**: En mobile < `md`, reducir `scrollHeight` de `400vh` a `250vh` (menos scroll para la misma animación)
2. **Tipografía**: Los tamaños mobile son la base; desktop escala con los breakpoints
3. **Espaciado**: Reducir 50% los espacios hasta `md:`
4. **Galería**: 1 columna en mobile, scroll horizontal se activa a partir de `md:`
5. **Touch**: Todas las áreas clickeables mínimo `44×44px` (Apple HIG)
6. **Henry Vision**: Upload full-screen en mobile con cámara nativa como opción

---

## 7. Componentes — Variantes de Micro-Lujo

### GlassCard v2

```css
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  backdrop-filter: blur(var(--glass-blur));
  transition: all var(--duration-fast) var(--ease-luxury);
  position: relative;
  overflow: hidden;
}

/* Cursor glow effect */
.glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    oklch(1 0 0 / 6%),
    transparent 40%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.glass-card:hover::after {
  opacity: 1;
}
```

### Botón CTA Premium

```css
.btn-luxury {
  padding: 1rem 2.5rem;
  font-family: Inter, sans-serif;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.8rem;
  background: var(--accent-gold);
  color: var(--bg-void);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-luxury);
}

.btn-luxury:hover {
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}
```

---

## 8. Regla de Oro para Futuros Agentes

> [!CAUTION]
> **NUNCA hagas esto en un sitio de lujo:**
> - ❌ Usar colores puros (`#ff0000`, `#0000ff`) — siempre desaturados
> - ❌ Bordes de más de `1px` (excepto accent deliberado)
> - ❌ Padding menor a `16px` en cualquier card
> - ❌ Animaciones "bounce" agresivas (springy = barato)
> - ❌ Fuentes `font-weight: 900` para body text
> - ❌ Gradientes multicolor (mantener monocromático + 1 acento)
> - ❌ Sombras con blur > 60px (se ven "infladas")
> - ❌ Scroll snap sin smooth scroll (Lenis)

> [!TIP]
> **SIEMPRE hacé esto:**
> - ✅ Espacio generoso entre secciones (mínimo `128px`)
> - ✅ Tracking negativo en títulos grandes
> - ✅ `font-weight: 300` para párrafos largos
> - ✅ Transiciones con `--ease-luxury` (nunca `linear` ni `ease`)
> - ✅ `prefers-reduced-motion` respetado
> - ✅ Colores OKLCH (percepción uniforme)
> - ✅ Un solo color de acento (gold) — menos es más
