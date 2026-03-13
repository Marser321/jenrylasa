---
name: nextjs-component
description: Generar componentes React/Next.js optimizados con TypeScript y Tailwind
---

# Generador de Componentes Next.js

Esta skill guía la creación de componentes React modernos para Next.js 15 (App Router).

## Reglas de Oro

1.  **TypeScript**: Siempre tipar props (`interface Props`) y exportar componentes como `export function ComponentName`.
2.  **Server vs Client**: Por defecto usar Server Components. Solo agregar "use client" si se usan hooks (`useState`, `useEffect`) o eventos (`onClick`).
3.  **Tailwind + Shadcn**: Usar clases utilitarias de Tailwind y componentes de Shadcn (`@/components/ui/*`) cuando sea posible.
4.  **Validación**: Si el componente maneja formularios o datos externos, usar Zod para validación.

## Plantilla Base

```tsx
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  customProp?: string
}

export function MyComponent({ className, customProp, ...props }: MyComponentProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <h1>{customProp || "Default Title"}</h1>
    </div>
  )
}
```
