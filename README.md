![01- Home Sin reg](https://github.com/DamianBroglia/FlorHasrunFront/assets/109920148/2f678968-c5e1-4e05-b121-94773571161d)<img src="assets/LogoFlor.png" alt="" width="1000px" />

# Flor Hasrun Estética y Bienestar App

## **Descripción**

App desarrollada en React Native para un salón de estética. Funciona como turnero para los usuarios de la app y como agenda, 
estadista y catalogo para el administrador. La app funciona con u sistema de creditos, el usuario, una vez verificado por el 
administrador, recibe 4 creditos, al guardar un turno se le retienen 2 creditos, si el usuario cumple con el turno se le 
devuelven, en caso contrario no se le devuelven. Si el usuario cancela dicho turno 24 hs antes del inicio del turno, se le 
devolverán los 2 creditos, si cancela cuando faltan menos de 24 hs para el turno solo se le devolverá 1 turno. En caso de que 
el usuario se quede sin creditos y no tenga turnos para el futuro, podrá solicitar hasta 4 creditos, en cuyo caso el administrador 
evaluará si otorga los creditos y la forma de cambio de los mismos (Ej: Cobrando por los creditos si el administrador entiende que 
los fallos a los turnos guardados no están debidamente justificados)

<br />

---

## **Funcionalidades**

Usuario:
- Ver los distintos servicios que brinda la estética 
- Guardar/cancelar un turno
- Elegir notificaciones personalizadas
- Ver/filtrar turnos pasados, futuros, cumplidos, etc
- Solicitar creditos cuando estos se acaben y no tenga turnos futuros

Administrador:
- Crear/modificar/eliminar servicios
- Ver agenda con los turnos guardados 
- Tomar la asistencia de los turnos
- Verificar usuario
- Hacer Vip a los usuarios (No necesitarán creditos para guardar turnos)
- Otorgar creditos
- Acceder a estadisticas entre dos fechas seleccionadas( Ej: ver las ganancias/turnos/sevicios mas solicitados entre el 01/05/23 al 01/06/23)
- Bloquear turnos para que no puedan ser guardados por los usuarios
- Bloquear dias para que ningun usuario pueda guardar un turno ese día
- Ver informacion y estadisticas de los usuarios (Cantidad de turnos, turnos fallados, ganancias producidas)
- Filtrar usuarios por: mas gastadores, mas turnos sacados, mas turnos cumplidos, etc


<br />

---

## **Tecnologias usadas**

- React Native
- Redux Toolkit
- Express
- Sequalize
- PostgreSQL

<br />

---


## **Capturas de la app**

<img src="assets/01- Home Sin reg.jpg" alt="" width="1000px" />
<img src="assets/03- About Flor.jpg" alt="" width="1000px" />
<img src="assets/04- Reg.jpg" alt="" width="1000px" />
<img src="assets/06- Catalogo.jpg" alt="" width="1000px" />
<img src="assets/07- detalle.jpg" alt="" width="1000px" />
<img src="assets/08- Usuario.jpg" alt="" width="1000px" />
<img src="assets/11- My Turn.jpg" alt="" width="1000px" />
<img src="assets/12- Guardar Turno.jpg" alt="" width="1000px" />
<img src="assets/13- Guardar Turno.jpg" alt="" width="1000px" />
<img src="assets/14- List User.jpg" alt="" width="1000px" />
<img src="assets/15- List User.jpg" alt="" width="1000px" />
<img src="assets/16- View User.jpg" alt="" width="1000px" />
<img src="assets/17- Agenda.jpg" alt="" width="1000px" />
<img src="assets/18- Estadisticas.jpg" alt="" width="1000px" />
<img src="assets/19- Ganancias.jpg" alt="" width="1000px" />
<img src="assets/20- Estadisticas Turnos.jpg" alt="" width="1000px" />
<img src="assets/21- Estadisticas Serv.jpg" alt="" width="1000px" />
<img src="assets/23- Form Serv.jpg" alt="" width="1000px" />
