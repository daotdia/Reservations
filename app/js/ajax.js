
function obtenerAllAsientosLibres() {
  return $.getJSON('http://localhost:8989/php/asientos_libres_all.php').then(function(response) {
      return response;
   });
}


function obtenerAsientosLibresFecha(fecha){
  return $.ajax({
      type: "POST",
      url: "http://localhost:8989/php/asientos_libres_fecha.php", 
      data: {
          fecha: fecha
      },
      success: function(response) {
          // La respuesta del script PHP se recibe aquí como un string en formato JSON.
          console.log(response);

          return response;
      },
      error: function(xhr, status, error) {
          console.error(error);
      }
  });
}

  function gestionarReserva(userInfo) {
    return new Promise(function (resolve, reject) {
      const numero_asiento = userInfo.asiento;
      const nombre = userInfo.name;
      const email = userInfo.email;
      const telefono = userInfo.phone;
      const fecha = userInfo.fecha;
  
      // Hacer una petición AJAX al archivo php para guardar la reserva en la base de datos
      $.ajax({
        method: "POST",
        url: "http://localhost:8989/php/añadir_reserva_y_o_usuario.php",
        data: {
          nombre: nombre,
          email: email,
          telefono: telefono,
          fecha: fecha,
          numero_asiento: numero_asiento,
        },
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, status, error) {
          reject(error);
        }
      });
    });
  }