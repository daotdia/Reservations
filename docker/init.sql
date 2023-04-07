

CREATE TABLE fechas (
    id_fecha SERIAL PRIMARY KEY,
    fecha DATE NOT NULL
);


CREATE TABLE asientos (
    id_asiento SERIAL PRIMARY KEY,
    id_fecha INTEGER REFERENCES fechas(id_fecha) ON DELETE CASCADE,
    numero_asiento INTEGER NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_fecha INTEGER REFERENCES fechas(id_fecha) ON DELETE CASCADE,
    id_asiento INTEGER REFERENCES asientos(id_asiento) ON DELETE CASCADE,
    UNIQUE (id_fecha, id_asiento)
);

--Indice para mejorar la búsqueda de los asientos.
CREATE INDEX idx_numero_asiento ON asientos (numero_asiento);



--Función para establecer el estado del asiento a libre tras eliminar una reserva y a ocupado tras insertarla.
CREATE OR REPLACE FUNCTION actualizar_estado_asiento()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    -- Si se elimina una reserva, establecer el estado del asiento a true
    UPDATE asientos SET estado = true WHERE id_asiento = OLD.id_asiento;
  ELSIF TG_OP = 'INSERT' THEN
    -- Si se inserta una nueva reserva, establecer el estado del asiento a false
    UPDATE asientos SET estado = false WHERE id_asiento = NEW.id_asiento;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER actualizar_estado_asiento
AFTER INSERT OR DELETE ON reservas
FOR EACH ROW
EXECUTE FUNCTION actualizar_estado_asiento();
