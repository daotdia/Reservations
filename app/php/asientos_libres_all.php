<?php

// Establecer la conexión a la base de datos
//CAMBIAR EN PRODUCCIÓN LOCALHOST POR DB
$dbconn = pg_connect("host=db dbname=postgres user=postgres password=asientos");

// Verificar si la conexión se estableció correctamente
if (!$dbconn) {
  die("Error de conexión a la base de datos: " . pg_last_error());
}

// Consultar los asientos libres de todas las fechas
$query = "SELECT fechas.fecha, asientos.numero_asiento
          FROM fechas
          INNER JOIN asientos ON fechas.id_fecha = asientos.id_fecha
          WHERE asientos.estado = true";

$result = pg_query($dbconn, $query);

// Crear un arreglo asociativo para almacenar los resultados
$asientosLibres = array();

// Recorrer los resultados de la consulta y almacenarlos en el arreglo asociativo
while ($row = pg_fetch_assoc($result)) {
  $fecha = $row['fecha'];
  $numeroAsiento = $row['numero_asiento'];
  
  if (!array_key_exists($fecha, $asientosLibres)) {
    $asientosLibres[$fecha] = array();
  }
  
  array_push($asientosLibres[$fecha], $numeroAsiento);
}

// Cerrar la conexión a la base de datos
pg_close($dbconn);

header('Content-Type: application/json');
// Convertir el arreglo asociativo a formato JSON y devolverlo
echo json_encode($asientosLibres, JSON_UNESCAPED_UNICODE);

?>
