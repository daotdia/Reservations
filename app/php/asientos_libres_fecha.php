<?php

// Conexión a la base de datos
//CAMBIAR EN PRODUCCIÓN LOCALHOST POR DB
$conn = pg_connect("host=localhost dbname=postgres user=postgres password=asientos");

// Obtener la fecha enviada por Ajax
$fecha = $_POST['fecha'];

// Consulta para obtener los asientos libres para la fecha especificada
$query = "SELECT * FROM asientos WHERE id_fecha = (SELECT id_fecha FROM fechas WHERE fecha = '$fecha') AND estado = true;";
$result = pg_query($conn, $query);

// Arreglo para almacenar los asientos libres
$asientosLibres = array();

// Recorrer el resultado de la consulta y guardar los asientos libres en el arreglo
while ($row = pg_fetch_assoc($result)) {
    $asientosLibres[] = $row;
}

// Devolver los asientos libres en formato JSON
echo json_encode($asientosLibres);

// Cerrar la conexión a la base de datos
pg_close($conn);

?>
