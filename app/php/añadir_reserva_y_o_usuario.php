<?php

// Obtener los datos enviados desde el archivo Ajax.js
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$fecha = $_POST['fecha'];
$numero_asiento = $_POST['numero_asiento'];

// Establecer la conexión a la base de datos
$conn = pg_connect("host=db dbname=postgres user=postgres password=asientos");

// Verificar si la conexión se estableció correctamente
if (!$conn) {
    die("La conexión a la base de datos falló");
}

// Iniciar transacción con nivel de aislamiento SERIALIZABLE
pg_query($conn, "BEGIN ISOLATION LEVEL SERIALIZABLE");

// Comprobar si el usuario ya existe en la tabla "usuarios"
$query = "SELECT id_usuario FROM usuarios WHERE nombre = '$nombre' AND email = '$email'";
$result = pg_query($conn, $query);

if (pg_num_rows($result) == 0) {
    // Si el usuario no existe, agregarlo a la tabla "usuarios"
    $query = "INSERT INTO usuarios (nombre, email, telefono) VALUES ('$nombre', '$email', '$telefono') RETURNING id_usuario";
    $result = pg_query($conn, $query);

    if (!$result) {
        // Si hay un error, hacer un rollback de la transacción
        pg_query($conn, "ROLLBACK");
        die("La consulta a la base de datos falló al tratar de añadir el usuario");
    }

    // Obtener el id del nuevo usuario
    $row = pg_fetch_row($result);
    $id_usuario = $row[0];
} else {
    // Si el usuario ya existe, obtener su id
    $row = pg_fetch_row($result);
    $id_usuario = $row[0];
}

// Buscar el id de la fecha correspondiente en la tabla "fechas"
$query = "SELECT id_fecha FROM fechas WHERE fecha = '$fecha'";
$result = pg_query($conn, $query);

if (pg_num_rows($result) > 0) {
    // Si la fecha ya existe, obtener su id
    $row = pg_fetch_row($result);
    $id_fecha = $row[0];
} else {
    // Si hay un error, hacer un rollback de la transacción
    pg_query($conn, "ROLLBACK");
    die("La consulta a la base de datos falló al encontrar la fecha");
}

//Obtengo el id del asiento.
$query = "SELECT id_asiento FROM asientos INNER JOIN fechas ON asientos.id_fecha = fechas.id_fecha WHERE numero_asiento = '$numero_asiento' AND fecha = '$fecha';";
$result = pg_query($conn, $query);

// Verificar si la consulta se ejecutó correctamente
if (!$result) {
    // Si hay un error, hacer un rollback de la transacción
    pg_query($conn, "ROLLBACK");
    die("La consulta a la base de datos falló al tratar de encontrar el id del asiento");
}
$row = pg_fetch_assoc($result);
$id_asiento = $row['id_asiento'];

// Agregar la reserva a la tabla "reservas"
$query = "INSERT INTO reservas (id_usuario, id_fecha, id_asiento) VALUES ($id_usuario, $id_fecha, $id_asiento)";
$result = pg_query($conn, $query);

// Verificar si la consulta se ejecutó correctamente
if (!$result) {
    // Si hay un error, hacer un rollback de la transacción
    $result = pg_query($conn, $query);
    pg_query($conn, "ROLLBACK");
    die("La consulta a la base de datos falló al tratar de insertar una nueva reserva $id_usuario, $id_fecha, $id_asiento");
}

// Si todo fue exitoso, hacer un commit de la transacción
pg_query($conn, "COMMIT");

// Cerrar la conexión a la base de datos
pg_close($conn);

// Devolver una respuesta al archivo Ajax.js
echo "La reserva del asiento $numero_asiento para la fecha $fecha ha sido agregada para el usuario $nombre";

?>
