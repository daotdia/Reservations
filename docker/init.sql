-- Eliminar para producción.

CREATE DATABASE postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

\c postgres

-- Hasta aquí. 

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
