-- ============================================================
-- Tabla: consultations (Consultas y Visitas Técnicas)
-- Gestiona la agenda de mediciones y consultas de diseño en obra.
-- ============================================================
CREATE TABLE IF NOT EXISTS consultations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE
    SET NULL,
        customer_name TEXT NOT NULL,
        project_description TEXT NOT NULL,
        scheduled_date DATE NOT NULL,
        scheduled_time TIME NOT NULL,
        expert TEXT NOT NULL,
        status TEXT DEFAULT 'Pendiente' CHECK (
            status IN (
                'Pendiente',
                'Confirmada',
                'Completada',
                'Cancelada'
            )
        ),
        location TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
);
-- Índice para consultas por fecha (el caso de uso principal)
CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(scheduled_date);
-- Índice para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_consultations_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_update_consultations_updated_at BEFORE
UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_consultations_updated_at();
-- RLS (Row Level Security) — Básico, acceso público por ahora
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated" ON consultations FOR ALL USING (true) WITH CHECK (true);