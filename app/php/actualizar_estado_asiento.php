<?php
// Obtener los datos enviados desde el archivo Ajax.js
$id_fecha = $_POST['id_fecha'];
$numero_asiento = $_POST['numero_asiento'];
$estado = $_POST['estado'];

// Establecer la conexión a la base de datos
//CAMBIAR EN PRODUCCIÓN LOCALHOST POR DB
$conn = pg_connect("host=localhost dbname=postgres user=postgres password=asientos");

// Verificar si la conexión se estableció correctamente
if (!$conn) {
    die("La conexión a la base de datos falló");
}

// Actualizar el estado del asiento
$query = "UPDATE asientos SET estado = $estado WHERE id_fecha = $id_fecha AND numero_asiento = $numero_asiento";

$result = pg_query($conn, $query);

// Verificar si la consulta se ejecutó correctamente
if (!$result) {
    die("La consulta a la base de datos falló");
}

// Cerrar la conexión a la base de datos
pg_close($conn);

// Devolver una respuesta al archivo Ajax.js
echo "El estado del asiento $numero_asiento para la fecha $id_fecha ha sido actualizado a $estado";
?>
