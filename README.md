# Reservations
<strong>Utilización de Bootstrap, Jquery, metodología Ajax, PHP (Composer), Apache y Nginx (proxy inverso para solucionar problemas CORS), Postgres y DockerCompose para crear web dinámica de reserva de asientos.</strong>

El datapicker muestra los días con distinto color dependiendo de si todos los asientos están reservados, quedan pocos o hay libres todavía. 

El objetivo de este proyecto es mostrar la capacidad del autor de manejar una web dinámica con PHP y Apache, y, a su vez,
la capacidad de montar una serie de contenedores Docker que se intercomunican entre sí para lograr ejecutar tanto el front como el back
en dicho entorno. <strong>Pudiendo acceder a una web dinámica en desarrollo de forma local con contenedores Docker</string>. 

<img src="https://imgur.com/pIwMUTA.png" alt="Formulario" width="1000" height="600">

## Uso
Simplemente construye y ejecuta el docker-compose con privilegios de administrador: 

`docker-compose up`

Y accede a la dirección http://localhost:8989/ desde tu navegador. 

![Asientos a reservar](https://imgur.com/bnAtAeV.png)
