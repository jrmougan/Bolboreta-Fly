# Proyecto final Bootcamp **HACK A BOSS**

Eduardo Sancho Foreman <br/>
Marta Padin Gomez <br/>
Jesus Romeo Mougan <br/>

<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo2.svg" alt="Logo" width="150" height="150">
  </a>
  <h3 align="center">Bolboreta Flight</h3>
  
</p>
<br />

## Acerca del proyecto

<img src='images/portadaBolboreta.png'>

Bolboreta Flight es un planificador de vuelos, donde puedes encontrar el vuelo que quieras en tiempo real.

### Tecnologías utilizadas

- **BACKEND** - Node.js <img src="images/logoNode.svg" alt="Logo" width="30">
- **FRONTEND** - React.js <img src="images/logoReact.svg" alt="Logo" width="30">
- **BASE DE DATOS** - MySQL <img src="images/logomysql.png" alt="Logo" width="30">

## Comenzando

### Instalación

1. Clona el repositorio
   ```sh
   git clone
   ```
2. Instala los paquetes NPM para el servidor
   ```sh
   cd backend
   npm install
   ```
3. Instala los paquetes NPM para el cliente
   ```sh
   cd frontend
   npm install
   ```
4. Inicializa la base de datos:

```sh
   cd servidor/bbdd/
   node initDB.js
```

5. En el .env del servidor necesitarás generar las siguientes credenciales:

   SENDGRID_API_KEY=<a href= "https://sendgrid.com/">Click aquí para generar</a> <br/>
   SENDGRID_FROM=**Correo desde el que envías el mail** <br/>
   UPLOAD_DIRECTORY=static/uploads <br/>
   PUBLIC_HOST=http://localhost:4000/ <br/>
   PORT=4000 <br/>
   AMADEUS_ID=<a href= "https://developers.amadeus.com/">Click aquí para generar</a> <br/>
   AMADEUS_SECRET=<a href= "https://developers.amadeus.com/">Click aquí para generar</a> <br/>
   APP_GOOGLE_CLIENT_ID=<a href= "https://developers.google.com/identity/protocols/oauth2">Click aquí para generar</a> <br/>

6. En el .env del servidor necesitarás generar las siguientes credenciales:
   REACT_APP_PUBLIC_HOST_BACKEND=localhost <br/>
   REACT_APP_PUBLIC_PORT_BACKEND=4000 <br/>
   REACT_APP_PAYPAL_CLIENTID=<a href= "https://developer.paypal.com/developer/accounts/">Click aquí para generar</a> <br/>
   PORT=4001<br/>
   REACT_APP_ACCESS_KEY_UNSPLASH= <br/>
   SECRET_KEY_UNSPLASH= <br/>

## Uso

Si quieres realizar el pago mediante Paypal usa está cuenta:

Email: sb-skyun12912253@personal.example.com <br/>
Password: 123456789<br/>

Si quieres realizar un pago mediante Paypal usando tarjeta puedes introducir una de estas dos :

Cambiar direccion a España!! </br>

Número de tarjeta: 4020026466711226 <br/>
Fecha de Caducidad: 11/2023 </br>
CVV: 026 </br>

---

Número de tarjeta: 4020024943226215 <br/>
Fecha de Caducidad: 07/2026</br>
CVV: 878 </br>

## Licencia

Distribuido bajo licencia del MIT.

<!-- Recursos para el Readme-->

[portalbolboreta]: screenShot/portadaBolboreta.png
[payment-screenshot]: images/payment.png
