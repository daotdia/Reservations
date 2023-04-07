export function validateForm(name, email, phone, date) {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phonePattern = /^\d{7,15}$/; // Asume números de 7 a 15 dígitos

    if (name === '' || email === '' || phone === '') {
        return 'Por favor, completa todos los campos.';
    }

    if (!emailPattern.test(email)) {
        return 'Por favor, introduce una dirección de correo electrónico válida.';
    }

    if (!phonePattern.test(phone)) {
        return 'Por favor, introduce un número de teléfono válido.';
    }

    if(date === ''){
        return 'Por favor, seleccione una fecha para reservar'
    }

    return ''; // No hay errores
}


export function formatDate(year, month, day) {
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export function obtenerEstadoParaFecha(fecha, asientos_libres) {
    for (var key in asientos_libres) {
      //console.log(key)
      //console.log(fecha)
      if (key == fecha) {
        var asientosLibresFecha = asientos_libres[key];
        var numAsientosLibres = asientosLibresFecha.length;
        if (numAsientosLibres >= 5) {
          return 'verde';
        } else if (numAsientosLibres > 0) {
          return 'amarillo';
        } else {
          return 'rojo';
        }
      }
    }
    return 'desconocido';
}