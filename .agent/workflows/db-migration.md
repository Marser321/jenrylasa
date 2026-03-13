---
description: Gestionar migraciones de base de datos
---

1. Generar tipos de TypeScript
   `npx supabase gen types typescript --project-id {PROJECT_ID} > src/types/supabase.ts`

2. Crear una nueva migración
   `npx supabase migration new {MIGRATION_NAME}`

3. Aplicar migraciones pendientes
   `npx supabase db push`
