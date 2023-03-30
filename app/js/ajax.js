
function obtenerAllAsientosLibres(){
    $.ajax({
        url: "ruta/al/archivo.php",
        type: "POST",
        dataType: "json",
        success: function(data) {
          // Manipular los datos obtenidos
          return data;
        },
        error: function(xhr, textStatus, errorThrown) {
          // Manejar el error
        }
      });
}

function obtenerAsientosLibresFecha(fecha, successCallback, errorCallback) {
    // Define los datos que se enviarán al archivo PHP
    var data = {
      fecha: fecha
    };
  
    // Realiza la llamada Ajax al archivo PHP
    $.ajax({
      url: 'obtener_asientos_libres.php',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: successCallback,
      error: errorCallback
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



