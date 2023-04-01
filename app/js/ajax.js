
function obtenerAllAsientosLibres() {
  return $.getJSON('http://127.0.0.1:3000/app/php/asientos_libres_all.php').then(function(response) {
      return response;
   });
}


function obtenerAsientosLibresFecha(fecha){
  return $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/app/php/asientos_libres_fecha.php", 
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

function actualizarAsiento(id_fecha, numero_asiento, estado) {
    // Define los datos que se enviarán al archivo PHP
    var data = {
      id_fecha: id_fecha,
      numero_asiento: numero_asiento,
      estado: estado
    };
  
    // Realiza la llamada Ajax al archivo PHP
    $.ajax({
      url: 'actualizar_asiento.php',
      type: 'POST',
      data: data,
      dataType: 'text',
      success: function(response) {
        // Maneja la respuesta del servidor
        console.log(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Maneja los errores de la llamada Ajax
        console.log('Error: ' + textStatus + ' ' + errorThrown);
      }
    });
  }



