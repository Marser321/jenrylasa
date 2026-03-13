-- 1. Clientes
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- 2. Proyectos (Ej: "Cocina Wynwood", "Closet Master Aventura")
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft' CHECK (
        status IN ('draft', 'in_progress', 'completed', 'cancelled')
    ),
    start_date DATE,
    estimated_end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- 3. Facturas
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE
    SET NULL,
        client_id UUID NOT NULL REFERENCES public.clients(id),
        invoice_number SERIAL UNIQUE,
        status TEXT DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'paid', 'void')),
        issue_date DATE DEFAULT CURRENT_DATE,
        due_date DATE,
        subtotal NUMERIC(10, 2) DEFAULT 0,
        tax_rate NUMERIC(5, 2) DEFAULT 0,
        -- Porcentaje
        total_amount NUMERIC(10, 2) DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- 4. Ítems de la Factura (Desglose por horas, materiales, etc.)
CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (
        item_type IN (
            'labor_hours',
            'wood_material',
            'weight',
            'time',
            'hardware',
            'other'
        )
    ),
    description TEXT NOT NULL,
    quantity NUMERIC(10, 3) NOT NULL DEFAULT 1,
    unit_measure TEXT,
    -- Ej: 'hrs', 'sqft', 'kg', 'unit'
    unit_price NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);
-- 5. Entregables / Adjuntos (Fotos y Planos)
CREATE TABLE IF NOT EXISTS public.project_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type TEXT CHECK (file_type IN ('image', 'plan_pdf', 'document')),
    description TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Habilitar RLS (Opcional, pero recomendado)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_attachments ENABLE ROW LEVEL SECURITY;
-- Políticas temporales para desarrollo (Permiten todo el acceso anon/auth)
CREATE POLICY "Enable all for developers" ON public.clients FOR ALL USING (true);
CREATE POLICY "Enable all for developers" ON public.projects FOR ALL USING (true);
CREATE POLICY "Enable all for developers" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Enable all for developers" ON public.invoice_items FOR ALL USING (true);
-- 6. Personal / Staff
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialty TEXT,
    experience TEXT,
    status TEXT DEFAULT 'Activo' CHECK (status IN ('Activo', 'Inactivo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Habilitar RLS para staff
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
-- Políticas para staff
CREATE POLICY "Enable all for developers" ON public.staff FOR ALL USING (true);