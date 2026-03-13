---
name: ui-design
description: Directrices de diseño para la Barbería Henry (Dark/Glass)
---

# Sistema de Diseño: Barbería Henry

## Estética General
- **Tema**: Dark Mode por defecto. Elegante, masculino, moderno.
- **Colores**:
  - Fondo: Zinc-950 (`bg-zinc-950`)
  - Acento: Gold/Amber (`text-amber-500`) o Rojo Desaturado para acciones críticas.
  - Superficies: Zinc-900 con transparencia (`bg-zinc-900/50`).
- **Efectos**:
  - Glassmorphism: `backdrop-blur-md bg-opacity-80`
  - Bordes sutiles: `border-white/10`

## Componentes Clave
1.  **Botones**: Bordes redondeados (`rounded-md`), efectos hover sutiles (`hover:bg-zinc-800`).
2.  **Tipografía**: Sans-serif moderna (Inter o similar). Títulos en negrita (`font-bold tracking-tight`).
3.  **Mobile First**: Todos los diseños deben funcionar perfectamente en pantallas pequeñas. Las tablas deben colapsar o tener scroll horizontal.

## Ejemplo de Card (Barber Services)

```tsx
<div className="group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-amber-500/50">
  <h3 className="text-xl font-bold text-white">Corte Clásico</h3>
  <p className="mt-2 text-zinc-400">Tijera y máquina con terminación a navaja.</p>
  <div className="mt-4 flex items-center justify-between">
    <span className="text-lg font-bold text-amber-500">$450</span>
    <Button variant="outline" className="border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-500">
      Reservar
    </Button>
  </div>
</div>
```
