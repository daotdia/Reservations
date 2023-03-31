$(document).ready(function () {
    const $userForm = $('#user-form');
    const $calendar = $('#calendar');
    const $seats = $('#seats');
    const $confirmation = $('#confirmation');
    const $thankyou = $('#thankyou');
    const $name = $('#name');
    const $email = $('#email');
    const $phone = $('#phone');
    const datapicker = $('#datapicker');

    var fecha = '';
    let asientos_libres;
    //Obtengo los días con asientos libres actuales
    obtenerAllAsientosLibres().then(function(response) {
        asientos_libres = response;
        console.log(asientos_libres)

        // Inicializa el calendario y los asientos aquí.
        datapicker.datepicker({
            format: 'yyyy-mm-dd', // Formato de fecha
            autoclose: true, // Cerrar automáticamente el calendario después de seleccionar una fecha
            todayHighlight: true, // Resaltar la fecha actual
            beforeShowDay: function(date) {
                // Necesario para personalizar la apariencia de los días del calendario

                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                
                // Obtener el estado de color para la fecha seleccionada
                var estado = obtenerEstadoParaFecha(formatDate(year,month,day));


                if (estado === 'verde') {
                    return {
                        enabled: true, // Habilitar el día
                        classes: 'bg-success' // Agregar una clase personalizada para colorear el fondo del día
                    };
                } else if (estado === 'amarillo') {
                    return {
                        enabled: true, // Habilitar el día
                        classes: 'bg-warning' // Agregar una clase personalizada para colorear el fondo del día
                    };
                } else {
                    return {
                        enabled: false, // Deshabilitar el día
                        classes: 'bg-ocuped'
                    };
                }
            },
            onSelect: function(dateText) {
            // Función para manejar la selección de una fecha
            // Aquí puedes realizar alguna acción cuando el usuario selecciona una fecha
            console.log("Fecha seleccionada: " + dateText);
            fecha = dateText;
            },
            orientation: 'bottom',
            language: 'es'
        });
    }).catch(function(error) {
        console.error(error);
    });

    

    // Maneja el envío del formulario de información del usuario
    $userForm.on('submit', function (event) {
        event.preventDefault();

        const name = $name.val().trim();
        const email = $email.val().trim();
        const phone = $phone.val().trim();
        

        // Valida los campos del formulario
        const errorMessage = validateForm(name, email, phone, fecha);

        if (errorMessage) {
            // Muestra el mensaje de error si la validación falla
            $errorMessage.text(errorMessage).insertAfter($userForm);
        } else {
            // Si la validación es exitosa, muestra el calendario
            $userForm.hide();
            $calendar.removeClass('d-none');
        }
        // Si la validación es exitosa, muestra el calendario
        $userForm.hide();
        $calendar.removeClass('d-none');
    });

    // Agrega eventos para manejar la selección de fechas en el calendario aquí

    


    // Agrega eventos para manejar la selección de asientos aquí


    // Maneja la confirmación de la reserva
    $confirmation.on('click', 'button', function () {
        // Envía la reserva al servidor y muestra el mensaje de agradecimiento aquí (por ejemplo, utilizando Ajax)

        $confirmation.hide();
        $thankyou.removeClass('d-none');

        // Reinicia la página después de 10 segundos
        setTimeout(function () {
            location.reload();
        }, 10000);
    });
    function obtenerEstadoParaFecha(fecha) {
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

});


function validateForm(name, email, phone, date) {
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

function obtenerAllAsientosLibres() {
    return $.getJSON('http://127.0.0.1:3000/app/php/asientos_libres_all.php').then(function(response) {
        return response;
     });
}

function formatDate(year, month, day) {
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}