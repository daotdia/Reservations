#!/usr/bin/env python3
import psycopg2
from datetime import datetime, timedelta
from random import randint, choices

# Configuración de la base de datos 
'''

Utilizar ésta en producción:

import os

db_name = os.environ['PGDATABASE']
db_user = os.environ['PGUSER']
db_password = os.environ['PGPASSWORD']
db_host = os.environ['PGHOST']
db_port = os.environ.get('PGPORT', '5432')


'''
db_name = 'postgres'
db_user = 'postgres'
db_password = 'asientos'
db_host = 'localhost'
db_port = '5432'

# Conexión a la base de datos
conn = psycopg2.connect(database=db_name, user=db_user, password=db_password, host=db_host, port=db_port)

# Generar datos aleatorios para los asientos
fechas_asientos = [(datetime.now() + timedelta(days=d)).strftime('%Y-%m-%d') for d in range(60)]
for fecha in fechas_asientos:
    num_asientos = 100
    estado_asientos = choices([True, False], weights=[0.25, 0.75], k=num_asientos)
    num_ocupados = estado_asientos.count(True)
    num_libres = num_asientos - num_ocupados
    if num_ocupados == num_asientos:
        prob_ocupado = 1
        prob_menos_cinco = 0
        prob_aleatorio = 0
    elif num_libres < 5:
        prob_ocupado = 0.25
        prob_menos_cinco = 0.75 - prob_ocupado
        prob_aleatorio = 0
    else:
        prob_ocupado = 0.25
        prob_menos_cinco = 0.5
        prob_aleatorio = 0.25
    num_ocupados = estado_asientos.count(True)
    num_libres = num_asientos - num_ocupados
    estado_asientos_str = ''.join(['1' if e else '0' for e in estado_asientos])
    cursor = conn.cursor()
    cursor.execute("INSERT INTO fechas (fecha) VALUES (%s)", (fecha,))
    cursor.execute("SELECT id FROM fechas WHERE fecha = %s", (fecha,))
    fecha_id = cursor.fetchone()[0]
    for i in range(num_asientos):
        if randint(0, 100) <= prob_ocupado * 100:
            estado = True
        elif randint(0, 100) <= prob_menos_cinco * 100:
            estado = False
        else:
            estado = bool(randint(0, 1))
        cursor.execute("INSERT INTO asientos (numero, fecha_id, estado) VALUES (%s, %s, %s)", (i + 1, fecha_id, estado))
    conn.commit()
    cursor.close()
    conn.close()

