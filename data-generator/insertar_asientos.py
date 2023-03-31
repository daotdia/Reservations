#!/usr/bin/env python3

import psycopg2
from datetime import datetime, timedelta
import random
import numpy as np

# Configuracion de la base de datos 
"""
Utilizar esta en producción:

import os

db_name = os.environ['PGDATABASE']
db_user = os.environ['PGUSER']
db_password = os.environ['PGPASSWORD']
db_host = os.environ['PGHOST']
db_port = os.environ.get('PGPORT', '5432')
"""

db_name = 'postgres'
db_user = 'postgres'
db_password = 'asientos'
db_host = 'localhost'
db_port = '5432'

# Conexion a la base de datos
conn = psycopg2.connect(database=db_name, user=db_user, password=db_password, host=db_host, port=db_port)

# Generar datos aleatorios para los asientos
fechas_asientos = [(datetime.now() + timedelta(days=d)).strftime('%Y-%m-%d') for d in range(60)]
array_probabilidades = ['ocupado', 'casiocupado', 'libre', 'libre']
asientos_libres = 0
for fecha in fechas_asientos:
    categoria = random.choice(array_probabilidades)
    num_asientos = 100
    if categoria == 'ocupado':
        asientos_libres = 0
    elif categoria == 'casiocupado':
        asientos_libres = random.choice(range(4))
    else:
        #Sé que esto incluye ocupados o casiocupados, pero es data simulada, nada más.
       asientos_libres = random.choice(range(100))
    
    cursor = conn.cursor()
    cursor.execute("INSERT INTO fechas (fecha) VALUES (%s)", (fecha,))
    cursor.execute("SELECT id_fecha FROM fechas WHERE fecha = %s", (fecha,))
    fecha_id = cursor.fetchone()[0]
    
    array = np.zeros(num_asientos, dtype=int)  # creamos un array con n ceros
    indices_aleatorios = random.sample(range(100), asientos_libres)  # generamos k índices aleatorios

    num_asiento = 1
    for i in indices_aleatorios:
        array[i] = 1  # asignamos 1 a los índices aleatorios
    
    for i in array:
        if i == 0:
            estado = False
        else:
            estado = True
        cursor.execute("INSERT INTO asientos (numero_asiento, id_fecha, estado) VALUES (%s, %s, %s)", (num_asiento, fecha_id, estado))
        num_asiento += 1
    conn.commit()
    cursor.close()
conn.close()
