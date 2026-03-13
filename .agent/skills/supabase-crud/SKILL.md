---
name: supabase-crud
description: Generar operaciones CRUD seguras con Supabase Server Actions
---

# Supabase CRUD Generator

Esta skill guía la implementación de lógica de backend usando Supabase y Server Actions en Next.js.

## Patrones Obligatorios

1.  **Server Actions**: Toda mutación (INSERT, UPDATE, DELETE) debe ser una Server Action en `src/app/actions/`.
2.  **Validación Zod**: Validar SIEMPRE los datos de entrada con Zod antes de llamar a Supabase.
3.  **Seguridad**: Usar `createClient` de `@supabase/ssr` para manejar cookies de sesión automáticamente.
4.  **Tipos Generados**: Usar `Database` importado de `@/types/supabase` para tipado estricto.

## Ejemplo de Server Action

```typescript
'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
  title: z.string().min(1),
})

export async function createItem(formData: FormData) {
  const supabase = createClient()
  
  const data = {
    title: formData.get("title"),
  }

  const result = schema.safeParse(data)
  if (!result.success) {
    return { error: "Datos inválidos" }
  }

  const { error } = await supabase.from("items").insert(result.data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/items")
  return { success: true }
}
```
