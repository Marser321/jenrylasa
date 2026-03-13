// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LASA KITCHENS & CLOSETS — Textos Maestros / Master Copy
// Idiomas: English (US Luxury) & Español (Latinoamérica High-End)
// Tono: "Traditional Craftsmanship, Modern Precision"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Locale = "en" | "es";

export interface ContentBlock {
    en: string;
    es: string;
}

/**
 * Función helper para acceder al contenido según el idioma activo.
 * Uso: t(content.hero.headline, 'en')
 */
export function t(block: ContentBlock, locale: Locale): string {
    return block[locale];
}

// ─────────────────────────────────────────────────────────────────────────
// 1. HERO SECTION — La primera impresión
// ─────────────────────────────────────────────────────────────────────────

export const hero = {
    overline: {
        en: "Bespoke Millwork Studio",
        es: "Estudio de Ebanistería a Medida",
    },
    headline: {
        en: "LASA",
        es: "LASA",
    },
    subheadline: {
        en: "Kitchens & Closets",
        es: "Kitchens & Closets",
    },
    tagline: {
        en: "Where precision joinery meets South Florida living.",
        es: "Donde la ebanistería de precisión se encuentra con el estilo de vida de South Florida.",
    },
    cta: {
        en: "Begin Your Vision",
        es: "Comience Su Visión",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 2. ABOUT US — La Historia de Jenrys
// ─────────────────────────────────────────────────────────────────────────

export const about = {
    overline: {
        en: "Our Philosophy",
        es: "Nuestra Filosofía",
    },
    headline: {
        en: "We Are Not a Cabinet Factory.\nWe Are Tailors of Wood.",
        es: "No Somos una Fábrica de Gabinetes.\nSomos Sastres de la Madera.",
    },
    paragraphs: [
        {
            en: "For decades, our hands have shaped wood into spaces that speak. Every dovetail joint, every edge profile, every surface finish carries the quiet confidence of artisans who learned their craft the old way — one shaving at a time.",
            es: "Durante décadas, nuestras manos han transformado la madera en espacios que hablan. Cada unión de cola de milano, cada perfil de borde, cada acabado lleva la confianza serena de artesanos que aprendieron su oficio a la manera tradicional — una viruta a la vez.",
        },
        {
            en: "Today, that heirloom-quality craftsmanship is amplified by CNC precision and 3D visualization. The result? Cabinetry that fits your life with millimetric accuracy — and materials curated to thrive in the tropical climate of South Florida.",
            es: "Hoy, esa artesanía de calidad heredada se amplifica con precisión CNC y visualización 3D. ¿El resultado? Carpintería que se adapta a su vida con exactitud milimétrica — y materiales seleccionados para prosperar en el clima tropical de South Florida.",
        },
        {
            en: "Show us any design from Pinterest, Instagram, or the pages of Architectural Digest. We will replicate it — not as a copy, but as an interpretation refined for your exact space, your rituals, your way of living.",
            es: "Muéstrenos cualquier diseño de Pinterest, Instagram, o las páginas de Architectural Digest. Lo replicaremos — no como una copia, sino como una interpretación refinada para su espacio exacto, sus rituales, su forma de vivir.",
        },
    ],
    values: {
        overline: {
            en: "Our Commitment",
            es: "Nuestro Compromiso",
        },
        items: [
            {
                title: {
                    en: "Obsession with Detail",
                    es: "Obsesión por el Detalle",
                },
                description: {
                    en: "Every grain direction is intentional. Every reveal is measured twice. We treat each project as a signature piece, never a production run.",
                    es: "Cada dirección de la veta es intencional. Cada línea se mide dos veces. Tratamos cada proyecto como una pieza de autor, nunca como una producción en serie.",
                },
            },
            {
                title: {
                    en: "White-Glove Installation",
                    es: "Instalación de Guante Blanco",
                },
                description: {
                    en: "Our crew arrives on time, protects your home, and leaves nothing behind but a finished masterpiece. Respect for your space is non-negotiable.",
                    es: "Nuestro equipo llega puntualmente, protege su hogar, y no deja nada atrás excepto una obra maestra terminada. El respeto por su espacio es innegociable.",
                },
            },
            {
                title: {
                    en: "Delivered on Schedule",
                    es: "Entregado en Tiempo",
                },
                description: {
                    en: "In a market where delays are the norm, we have built our reputation on one unpopular habit: keeping our word. Your timeline is our timeline.",
                    es: "En un mercado donde los retrasos son la norma, hemos construido nuestra reputación sobre un hábito poco popular: cumplir nuestra palabra. Su calendario es nuestro calendario.",
                },
            },
        ],
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 3. WHY CHOOSE US — Los 3 Pilares
// ─────────────────────────────────────────────────────────────────────────

export const whyChooseUs = {
    overline: {
        en: "The Lasa Difference",
        es: "La Diferencia Lasa",
    },
    headline: {
        en: "Three Pillars of Excellence",
        es: "Tres Pilares de Excelencia",
    },
    pillars: [
        {
            icon: "compass", // Ícono sugerido (Lucide)
            title: {
                en: "Design Without Limits",
                es: "Diseño Sin Límites",
            },
            description: {
                en: "If you saw it in a magazine, we build it. If you dreamed it, we engineer it. From floating vanities to floor-to-ceiling entertainment walls, your imagination is our only blueprint.",
                es: "Si lo vio en una revista, lo construimos. Si lo soñó, lo diseñamos. Desde vanitorios flotantes hasta paredes de entretenimiento del piso al techo, su imaginación es nuestro único plano.",
            },
        },
        {
            icon: "map-pin", // Ícono sugerido (Lucide)
            title: {
                en: "Local Manufacturing",
                es: "Fabricación Local",
            },
            description: {
                en: "No container ships from overseas. No six-month wait lists. Our workshop is right here in South Florida — which means faster delivery, hands-on quality control, and materials selected to withstand salt air and humidity.",
                es: "Sin contenedores del exterior. Sin listas de espera de seis meses. Nuestro taller está aquí mismo en South Florida — lo que significa entregas más rápidas, control de calidad presencial, y materiales seleccionados para resistir el aire salino y la humedad.",
            },
        },
        {
            icon: "cpu", // Ícono sugerido (Lucide)
            title: {
                en: "Tech-Infused Woodworking",
                es: "Ebanistería Potenciada por Tecnología",
            },
            description: {
                en: "Old-world joinery meets new-world precision. Our CNC routers cut to the hundredth of a millimeter. Our 3D renderings let you walk through your kitchen before a single board is cut. The future of craftsmanship is here.",
                es: "La ebanistería tradicional se encuentra con la precisión del nuevo mundo. Nuestros routers CNC cortan a la centésima de milímetro. Nuestros renders 3D le permiten recorrer su cocina antes de cortar una sola tabla. El futuro de la artesanía está aquí.",
            },
        },
    ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 4. SECCIONES DE PRODUCTO — Kitchens & Closets
// ─────────────────────────────────────────────────────────────────────────

export const kitchens = {
    overline: {
        en: "Kitchens",
        es: "Cocinas",
    },
    headline: {
        en: "The Culinary Stage.",
        es: "El Escenario Culinario.",
    },
    description: {
        en: "Surfaces that mirror your culinary artistry. Bespoke cabinetry engineered for the way you cook, entertain, and gather. Seamless hardware integration, heirloom-quality finishes, and layouts designed to make every movement intuitive.",
        es: "Superficies que reflejan su arte culinario. Carpintería a medida diseñada para la forma en que cocina, entretiene y se reúne. Integración de herrajes impecable, acabados de calidad heredada, y distribuciones diseñadas para que cada movimiento sea intuitivo.",
    },
} as const;

export const closets = {
    overline: {
        en: "Closets",
        es: "Closets",
    },
    headline: {
        en: "Your Personal Boutique.",
        es: "Su Boutique Personal.",
    },
    description: {
        en: "Storage, elevated to an art form. Walk-in closets curated with boutique sensibilities — illuminated displays for your collection, custom drawer inserts for every accessory, and finishes that make getting dressed the most luxurious part of your day.",
        es: "Almacenamiento, elevado a forma de arte. Walk-in closets curados con sensibilidad de boutique — exhibidores iluminados para su colección, insertos de cajón personalizados para cada accesorio, y acabados que hacen de vestirse el momento más lujoso de su día.",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 5. PRECISION — Declaración de una sola palabra
// ─────────────────────────────────────────────────────────────────────────

export const precisionStatement = {
    word: {
        en: "Precision.",
        es: "Precisión.",
    },
    subtext: {
        en: "To the hundredth of a millimeter.",
        es: "A la centésima de milímetro.",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 6. JENRYS VISION — AR & AI
// ─────────────────────────────────────────────────────────────────────────

export const vision = {
    overline: {
        en: "Lasa Vision™",
        es: "Lasa Vision™",
    },
    headline: {
        en: "See It Before It Exists.",
        es: "Véalo Antes de que Exista.",
    },
    description: {
        en: "Step into your future kitchen through Augmented Reality, or let our AI estimate dimensions from a single photograph. Technology in service of craftsmanship.",
        es: "Recorra su futura cocina a través de Realidad Aumentada, o permita que nuestra IA estime dimensiones a partir de una sola fotografía. Tecnología al servicio de la artesanía.",
    },
    arLabel: {
        en: "Augmented Reality",
        es: "Realidad Aumentada",
    },
    aiLabel: {
        en: "AI Estimation",
        es: "Estimación con IA",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 7. CONTACT — CTA Final
// ─────────────────────────────────────────────────────────────────────────

export const contact = {
    overline: {
        en: "Let's Create Together",
        es: "Creemos Juntos",
    },
    headline: {
        en: "Your Vision Deserves\na Conversation.",
        es: "Su Visión Merece\nuna Conversación.",
    },
    description: {
        en: "Tell us about the space you envision. We will respond within 24 hours with a curated consultation plan — because extraordinary spaces begin with an extraordinary dialogue.",
        es: "Cuéntenos sobre el espacio que imagina. Responderemos en 24 horas con un plan de consulta personalizado — porque los espacios extraordinarios comienzan con un diálogo extraordinario.",
    },
    cta: {
        en: "Schedule a Consultation",
        es: "Agende una Consulta",
    },
    formLabels: {
        name: { en: "Full Name", es: "Nombre Completo" },
        namePlaceholder: { en: "John Doe", es: "Juan Pérez" },
        email: { en: "Email", es: "Correo Electrónico" },
        emailPlaceholder: { en: "john@example.com", es: "juan@ejemplo.com" },
        phone: { en: "Phone", es: "Teléfono" },
        phonePlaceholder: { en: "+1 (305) 555-0123", es: "+1 (305) 555-0123" },

        projectType: { en: "Project Type", es: "Tipo de Proyecto" },
        projectOptions: {
            kitchen: { en: "Kitchen", es: "Cocina" },
            closet: { en: "Closet", es: "Closet" },
            fullHome: { en: "Full Home Millwork", es: "Ebanistería Completa" },
            commercial: { en: "Commercial", es: "Comercial" },
            other: { en: "Other", es: "Otro" },
        },

        budget: { en: "Investment Range for this Space", es: "Rango de Inversión para este Espacio" },
        budgetOptions: {
            essential: { en: "Essential ($15k+)", es: "Esencial ($15k+)" },
            premium: { en: "Premium ($30k+)", es: "Premium ($30k+)" },
            luxury: { en: "Bespoke Luxury ($60k+)", es: "Lujo a Medida ($60k+)" },
        },

        style: { en: "What inspires you?", es: "¿Qué le inspira?" },
        styleOptions: {
            modern: { en: "Modern Minimalist", es: "Minimalista Moderno" },
            coastal: { en: "Coastal / Hamptons", es: "Costero / Hamptons" },
            traditional: { en: "Traditional / Classic", es: "Tradicional / Clásico" },
            industrial: { en: "Industrial", es: "Industrial" },
        },

        message: { en: "Tell us about your vision", es: "Cuéntenos sobre su visión" },
        messagePlaceholder: {
            en: "E.g. Full kitchen renovation in Coral Gables, interested in white oak...",
            es: "Ej: Renovación completa de cocina en Coral Gables, interesado en roble blanco..."
        },

        submit: { en: "Begin Your Vision", es: "Comience Su Visión" },
        sending: { en: "Sending...", es: "Enviando..." },
    },
    successMessage: {
        headline: { en: "Message Sent", es: "Mensaje Enviado" },
        body: {
            en: "Thank you. Jenry's team acts fast. We will review your vision and contact you within 24 hours.",
            es: "Gracias. El equipo de Jenry actúa rápido. Revisaremos tu consulta y te contactaremos en menos de 24 horas."
        },
        cta: { en: "Send another message", es: "Enviar otro mensaje" },
    }
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 8. FOOTER
// ─────────────────────────────────────────────────────────────────────────

export const footer = {
    brandName: {
        en: "Lasa",
        es: "Lasa",
    },
    tagline: {
        en: "Bespoke Kitchens & Closets · South Florida",
        es: "Cocinas & Closets a Medida · South Florida",
    },
    nav: {
        kitchens: { en: "Kitchens", es: "Cocinas" },
        closets: { en: "Closets", es: "Closets" },
        projects: { en: "Projects", es: "Proyectos" },
        about: { en: "About", es: "Nosotros" },
        contact: { en: "Contact", es: "Contacto" },
    },
    legal: {
        en: "© {year} Lasa Kitchens & Closets. All rights reserved.",
        es: "© {year} Lasa Kitchens & Closets. Todos los derechos reservados.",
    },
    locationLabel: {
        en: "Crafted in South Florida",
        es: "Fabricado en South Florida",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 9. META SEO
// ─────────────────────────────────────────────────────────────────────────

export const meta = {
    home: {
        title: {
            en: "Lasa Kitchens & Closets | Bespoke Millwork Studio · South Florida",
            es: "Lasa Kitchens & Closets | Estudio de Ebanistería a Medida · South Florida",
        },
        description: {
            en: "Bespoke cabinetry, custom closets, and luxury millwork tailored for your lifestyle in Coral Gables and South Florida.",
            es: "Carpintería a medida, closets personalizados y ebanistería de lujo adaptada a su estilo de vida en Coral Gables y South Florida.",
        },
    },
    about: {
        title: {
            en: "About Jenry Lasa | Decades of Artisan Craftsmanship · South Florida",
            es: "Sobre Jenry Lasa | Décadas de Artesanía · South Florida",
        },
        description: {
            en: "Meet the artisans behind Lasa Kitchens & Closets. Decades of woodworking expertise, local manufacturing, and a relentless pursuit of perfection in every joint and finish.",
            es: "Conozca a los artesanos detrás de Lasa Kitchens & Closets. Décadas de experiencia en ebanistería, fabricación local, y una búsqueda incansable de la perfección en cada unión y acabado.",
        },
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 10. INSPIRATION GALLERY — Portafolio de Estilos
// ─────────────────────────────────────────────────────────────────────────

export interface InspirationItem {
    id: string;
    category: "kitchen" | "closet";
    title: ContentBlock;
    description: ContentBlock;
    disclaimer: ContentBlock;
    seoKeywords: string[];
}

export const inspirationGallery: InspirationItem[] = [
    // ── COCINAS ─────────────────────────────────────────────────────────
    {
        id: "kitchen-rift-oak-minimalist",
        category: "kitchen",
        title: {
            en: "Rift-Cut White Oak · Minimalist Penthouse Kitchen",
            es: "Roble Blanco Rift-Cut · Cocina Minimalista de Penthouse",
        },
        description: {
            en: "Rift-cut White Oak cabinets with continuous vertical grain matched panel-to-panel. Monolithic quartz island with a full waterfall edge on both sides. Integrated push-to-open hardware eliminates handles for a seamless, gallery-like aesthetic. Soft-close Blum Legrabox drawers throughout. Marine-grade lacquer finish engineered for Miami Beach's salt-air environment.",
            es: "Gabinetes de Roble Blanco cortado en Rift con veta vertical continua, alineada panel a panel. Isla monolítica de cuarzo con borde en cascada en ambos lados. Herrajes integrados 'push-to-open' que eliminan las manijas para una estética limpia de galería. Cajones Blum Legrabox con cierre suave en todo el diseño. Acabado en laca de grado marino, diseñada para el ambiente salino de Miami Beach.",
        },
        disclaimer: {
            en: "Inspiration style. We custom build this exact aesthetic — tailored to your specific floor plan and lifestyle.",
            es: "Estilo de inspiración. Fabricamos esta estética exacta — adaptada a su plano y estilo de vida específicos.",
        },
        seoKeywords: ["Miami Beach penthouse kitchen", "rift-cut white oak cabinets", "waterfall quartz island", "push-to-open cabinetry Miami"],
    },
    {
        id: "kitchen-coral-gables-mediterranean",
        category: "kitchen",
        title: {
            en: "Glazed Ceruse Finish · Coral Gables Mediterranean Kitchen",
            es: "Acabado Ceruse Glaseado · Cocina Mediterránea de Coral Gables",
        },
        description: {
            en: "Raised-panel cabinetry in solid Alder wood with a hand-applied ceruse glaze that highlights the natural grain — a signature technique of Mediterranean estates. Ornate crown molding with dentil detailing. Honed Calacatta marble countertops with a full-height backsplash. Antique brass hardware and concealed European hinges. Humidity-resistant MDF core panels ensure zero warping in the South Florida climate.",
            es: "Gabinetes de panel elevado en madera maciza de Aliso con glaseado ceruse aplicado a mano que resalta la veta natural — una técnica característica de las residencias mediterráneas. Molduras de corona ornamentadas con detalles de dentil. Mesados de mármol Calacatta en acabado mate (honed) con salpicadero de altura completa. Herrajes en latón envejecido y bisagras europeas ocultas. Paneles con núcleo de MDF resistente a la humedad que garantizan cero deformación en el clima de South Florida.",
        },
        disclaimer: {
            en: "Inspiration style. We replicate this Old-World elegance — precision-fitted to your Coral Gables kitchen dimensions.",
            es: "Estilo de inspiración. Replicamos esta elegancia del Viejo Mundo — ajustada con precisión a las dimensiones de su cocina en Coral Gables.",
        },
        seoKeywords: ["Coral Gables Mediterranean kitchen", "ceruse glaze cabinetry", "Calacatta marble kitchen Miami", "custom millwork Coral Gables"],
    },
    {
        id: "kitchen-wynwood-industrial",
        category: "kitchen",
        title: {
            en: "Blackened Steel & Reclaimed Timber · Wynwood Industrial Loft Kitchen",
            es: "Acero Ennegrecido y Madera Reciclada · Cocina de Loft Industrial Wynwood",
        },
        description: {
            en: "Flat-slab cabinets in thermally-treated Ash with a charcoal wire-brush texture. Open steel shelving with a blackened patina finish — each bracket hand-welded and sealed. Poured concrete countertops with raw, unpolished edges. Exposed pull hardware in matte black stainless steel. Under-cabinet LED strip lighting on warm 2700K. Designed for the raw, creative energy of a Wynwood loft conversion.",
            es: "Gabinetes de panel plano en Fresno tratado térmicamente con textura de cepillo de alambre en tono carbón. Estantería abierta de acero con acabado de pátina ennegrecida — cada soporte soldado a mano y sellado. Mesados de concreto vertido con bordes crudos sin pulir. Tiradores expuestos en acero inoxidable negro mate. Iluminación LED bajo gabinete en tono cálido de 2700K. Diseñado para la energía creativa y cruda de una conversión de loft en Wynwood.",
        },
        disclaimer: {
            en: "Inspiration style. We fabricate this industrial-luxe DNA — engineered for your exact loft layout and structural specs.",
            es: "Estilo de inspiración. Fabricamos este ADN industrial-luxe — diseñado para la distribución exacta de su loft y especificaciones estructurales.",
        },
        seoKeywords: ["Wynwood industrial loft kitchen", "blackened steel cabinets", "reclaimed timber kitchen Miami", "concrete countertops Wynwood"],
    },
    {
        id: "kitchen-key-biscayne-coastal",
        category: "kitchen",
        title: {
            en: "Weathered Teak & Quartzite · Key Biscayne Coastal Kitchen",
            es: "Teca Envejecida y Cuarcita · Cocina Costera de Key Biscayne",
        },
        description: {
            en: "Shaker-profile cabinets crafted in sustainably-sourced Teak with a weathered driftwood finish — UV-stable and impervious to salt exposure. Quartzite countertops in 'Sea Pearl' with natural movement that echoes ocean currents. Brushed nickel hardware with marine-grade anti-corrosion coating. Full soft-close cabinetry with adjustable interior dividers. Every material hand-selected to endure the waterfront lifestyle of Key Biscayne.",
            es: "Gabinetes perfil Shaker fabricados en Teca de origen sustentable con acabado de madera a la deriva envejecida — estable a los UV e impermeable a la exposición salina. Mesados de Cuarcita en 'Sea Pearl' con movimiento natural que evoca las corrientes oceánicas. Herrajes en níquel cepillado con recubrimiento anticorrosión de grado marino. Carpintería completa con cierre suave y divisores interiores ajustables. Cada material seleccionado a mano para resistir el estilo de vida costero de Key Biscayne.",
        },
        disclaimer: {
            en: "Inspiration style. We handcraft this coastal sophistication — built to withstand your waterfront environment, down to each hinge and seal.",
            es: "Estilo de inspiración. Fabricamos a mano esta sofisticación costera — construida para resistir su entorno frente al mar, hasta cada bisagra y sellado.",
        },
        seoKeywords: ["Key Biscayne coastal kitchen", "teak cabinets waterfront", "quartzite countertops Miami", "marine-grade cabinetry Key Biscayne"],
    },
    {
        id: "kitchen-coconut-grove-transitional",
        category: "kitchen",
        title: {
            en: "Walnut & Unlacquered Brass · Coconut Grove Transitional Kitchen",
            es: "Nogal y Latón Sin Lacar · Cocina Transicional de Coconut Grove",
        },
        description: {
            en: "Flat-front cabinetry in book-matched American Black Walnut — each pair of doors opened like the pages of a book to create a mirror-image grain pattern. Unlacquered brass hardware that develops a living patina over time. Leathered granite countertops in 'Cosmic Black' with a tactile, low-sheen surface. Integrated appliance panels conceal refrigeration and dishwasher behind continuous wood grain. A transitional design bridging classic warmth and modern restraint, inspired by the tree-canopy charm of Coconut Grove.",
            es: "Gabinetes de frente plano en Nogal Negro Americano con veta en espejo (book-matched) — cada par de puertas abierto como las páginas de un libro para crear un patrón de veta simétrico. Herrajes en latón sin lacar que desarrollan una pátina viva con el tiempo. Mesados de granito 'leathered' en 'Cosmic Black' con superficie táctil de brillo bajo. Paneles integrados de electrodomésticos que ocultan refrigerador y lavavajillas detrás de la veta continua de madera. Un diseño transicional que une la calidez clásica con la sobriedad moderna, inspirado en el encanto arbolado de Coconut Grove.",
        },
        disclaimer: {
            en: "Inspiration style. We engineer this timeless balance — custom-dimensioned to every corner of your Coconut Grove kitchen.",
            es: "Estilo de inspiración. Diseñamos este equilibrio atemporal — dimensionado a medida para cada rincón de su cocina en Coconut Grove.",
        },
        seoKeywords: ["Coconut Grove transitional kitchen", "book-matched walnut cabinets", "unlacquered brass kitchen hardware", "custom kitchen Coconut Grove"],
    },

    // ── CLOSETS ─────────────────────────────────────────────────────────
    {
        id: "closet-boutique-charcoal",
        category: "closet",
        title: {
            en: "Charcoal Matte Lacquer · Boutique-Style Walk-In Closet",
            es: "Laca Mate Charcoal · Walk-In Closet Estilo Boutique",
        },
        description: {
            en: "Boutique-inspired walk-in closet finished in 'Charcoal' matte lacquer with velvet-smooth touch. Integrated LED lighting recessed into every shelf and hanging rail, activated by proximity sensors. Center island with tempered glass top for accessories and velvet-lined jewelry drawers with custom dividers. Full-length mirror panel with backlit perimeter glow. Anodized aluminum hanging rods rated for heavy garment loads. Designed for the discerning collector who views dressing as a daily ritual.",
            es: "Walk-in closet de inspiración boutique terminado en laca mate 'Charcoal' con tacto suave aterciopelado. Iluminación LED integrada empotrada en cada estante y barra de colgar, activada por sensores de proximidad. Isla central con tope de vidrio templado para accesorios y cajones forrados en terciopelo con divisores personalizados para joyería. Panel de espejo de cuerpo entero con resplandor perimetral retroiluminado. Barras de colgar en aluminio anodizado con capacidad para cargas pesadas de prendas. Diseñado para el coleccionista exigente que ve vestirse como un ritual diario.",
        },
        disclaimer: {
            en: "Inspiration style. We build this boutique experience — precisely configured for your wardrobe inventory and room geometry.",
            es: "Estilo de inspiración. Construimos esta experiencia boutique — configurada con precisión para su inventario de vestuario y la geometría de su habitación.",
        },
        seoKeywords: ["boutique walk-in closet Miami", "LED-lit closet system", "luxury closet design South Florida", "charcoal lacquer closet"],
    },
    {
        id: "closet-miami-beach-glass",
        category: "closet",
        title: {
            en: "Frosted Glass & White Lacquer · Miami Beach High-Rise Closet",
            es: "Vidrio Esmerilado y Laca Blanca · Closet de High-Rise Miami Beach",
        },
        description: {
            en: "Floor-to-ceiling closet system in high-gloss white lacquer with frosted tempered glass door inserts that reveal silhouettes without exposing contents. Motorized shoe carousel with 40-pair capacity on a whisper-quiet rotary mechanism. Pull-down hanging rods for upper-tier garments — accessible at the touch of a button. Integrated cedar-lined seasonal storage behind concealed panels. Soft-ambient LED strips in 4000K daylight tone for accurate color matching when selecting outfits. Built for the vertical living of a Miami Beach luxury high-rise.",
            es: "Sistema de closet de piso a techo en laca blanca de alto brillo con insertos de puertas en vidrio templado esmerilado que revelan siluetas sin exponer el contenido. Carrusel motorizado de zapatos con capacidad para 40 pares en un mecanismo rotativo silencioso. Barras de colgar retráctiles para prendas del nivel superior — accesibles al toque de un botón. Almacenamiento estacional con revestimiento de cedro integrado detrás de paneles ocultos. Tiras LED de ambiente suave en tono luz día 4000K para combinación precisa de colores al seleccionar atuendos. Construido para la vida vertical de un high-rise de lujo en Miami Beach.",
        },
        disclaimer: {
            en: "Inspiration style. We manufacture this high-rise closet system — fully adapted to your unit's dimensions and storage needs.",
            es: "Estilo de inspiración. Fabricamos este sistema de closet para high-rise — completamente adaptado a las dimensiones de su unidad y necesidades de almacenamiento.",
        },
        seoKeywords: ["Miami Beach high-rise closet", "motorized shoe carousel", "frosted glass closet system", "luxury closet Miami Beach condo"],
    },
    {
        id: "closet-coral-gables-dressing-room",
        category: "closet",
        title: {
            en: "Espresso Oak & Brushed Gold · Coral Gables Dressing Room",
            es: "Roble Espresso y Dorado Cepillado · Vestidor de Coral Gables",
        },
        description: {
            en: "Grand dressing room in quarter-sawn Oak stained to a deep espresso tone with subtle cathedral grain. Brushed gold hanging rails, drawer pulls, and trim accents throughout. Tufted seating bench upholstered in Italian leather, integrated into the center island. Illuminated handbag display cubbies with adjustable glass shelves. Valet rod pull-outs for next-day outfit staging. Crown molding with integrated cove lighting that creates an ambient ceiling glow — evoking the atmosphere of a private atelier in Coral Gables.",
            es: "Gran vestidor en Roble de corte cuartado teñido en tono espresso profundo con sutil veta catedral. Barras de colgar, tiradores de cajón y acentos de moldura en dorado cepillado a lo largo del diseño. Banco de asiento capitoné tapizado en cuero italiano, integrado en la isla central. Cubículos iluminados para exhibición de carteras con estantes de vidrio ajustables. Barras valet extraíbles para preparar el atuendo del día siguiente. Moldura de corona con iluminación de cala integrada que crea un resplandor ambiental en el techo — evocando la atmósfera de un atelier privado en Coral Gables.",
        },
        disclaimer: {
            en: "Inspiration style. We craft this dressing-room grandeur — every shelf, rail, and detail made-to-measure for your Coral Gables residence.",
            es: "Estilo de inspiración. Creamos esta grandeza de vestidor — cada estante, barra y detalle hecho a medida para su residencia en Coral Gables.",
        },
        seoKeywords: ["Coral Gables dressing room", "espresso oak closet", "brushed gold closet hardware", "luxury walk-in closet Coral Gables"],
    },
    {
        id: "closet-brickell-gentleman",
        category: "closet",
        title: {
            en: "Smoked Eucalyptus & Gunmetal · Brickell Gentleman's Closet",
            es: "Eucalipto Ahumado y Gunmetal · Closet de Caballero de Brickell",
        },
        description: {
            en: "A masculine walk-in closet veneered in smoked Eucalyptus with a horizontal grain direction for a contemporary, grounding effect. Gunmetal-finish aluminum frame system with integrated tie and belt racks. Watch winder drawer with micro-suede lining and individual cushions for six timepieces. Pull-out trouser rack with non-slip felted bars. Concealed safe compartment behind a flush panel — invisible to the eye, secured by biometric lock. Climate-controlled humidor drawer for cigar collections. Designed for the Brickell executive who demands order, discretion, and refined taste.",
            es: "Walk-in closet masculino enchapado en Eucalipto ahumado con dirección de veta horizontal para un efecto contemporáneo y conectado a tierra. Sistema de estructura en aluminio acabado gunmetal con portacorbatas y portacinturones integrados. Cajón con rotor de relojes (watch winder) con revestimiento de micro-gamuza y almohadillas individuales para seis piezas. Rack extraíble para pantalones con barras afieltradas antideslizantes. Compartimento de caja fuerte oculto detrás de un panel al ras — invisible al ojo, asegurado con cerradura biométrica. Cajón humidor con control de clima para colecciones de cigarros. Diseñado para el ejecutivo de Brickell que demanda orden, discreción y gusto refinado.",
        },
        disclaimer: {
            en: "Inspiration style. We engineer this gentleman's retreat — precision-built for your lifestyle, collection, and security requirements.",
            es: "Estilo de inspiración. Diseñamos este refugio de caballero — construido con precisión para su estilo de vida, colección y requerimientos de seguridad.",
        },
        seoKeywords: ["Brickell gentleman closet", "smoked eucalyptus closet", "watch winder drawer closet Miami", "luxury men closet Brickell"],
    },
    {
        id: "closet-aventura-family",
        category: "closet",
        title: {
            en: "White Maple & Soft Blush · Aventura Family Master Closet",
            es: "Arce Blanco y Rosa Suave · Closet Principal Familiar de Aventura",
        },
        description: {
            en: "A shared his-and-hers master closet in natural White Maple with a clear satin finish that brightens the space. Her side features illuminated open shelving for shoes, a fold-out full-length mirror, and a vanity nook with integrated electrical outlets and warm 3000K lighting. His side includes double-hang sections for suits, a pull-out valet rod, and a dedicated drawer unit for watches and cufflinks. Shared center island in soft blush-toned lacquer with Carrara marble top for folding and staging. Humidity-controlled cedar panels behind seasonal storage sections. A family-forward design for the modern Aventura lifestyle.",
            es: "Closet principal compartido para él y ella en Arce Blanco natural con acabado satinado claro que ilumina el espacio. El lado de ella presenta estantería abierta iluminada para zapatos, un espejo de cuerpo entero plegable, y un rincón vanity con tomas eléctricas integradas e iluminación cálida de 3000K. El lado de él incluye secciones de doble colgado para trajes, barra valet extraíble, y una unidad de cajones dedicada para relojes y gemelos. Isla central compartida en laca tono rosa suave con tope de mármol Carrara para doblar y preparar atuendos. Paneles de cedro con control de humedad detrás de las secciones de almacenamiento estacional. Un diseño orientado a la familia para el estilo de vida moderno de Aventura.",
        },
        disclaimer: {
            en: "Inspiration style. We design this shared sanctuary — custom-divided and built for how your family actually lives and dresses.",
            es: "Estilo de inspiración. Diseñamos este santuario compartido — dividido a medida y construido para cómo su familia realmente vive y se viste.",
        },
        seoKeywords: ["Aventura family master closet", "his and hers closet Miami", "white maple closet system", "luxury shared closet Aventura"],
    },
];

// ─────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN COMPLETA
// ─────────────────────────────────────────────────────────────────────────

export const content = {
    hero,
    about,
    whyChooseUs,
    kitchens,
    closets,
    precisionStatement,
    vision,
    contact,
    footer,
    meta,
    inspirationGallery,
} as const;

export default content;
