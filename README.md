# Proyecto final Bootcamp en **HACK A BOSS**

Eduardo Sancho Foreman
Marta Padin Gomez
Jesus Romeo Mougan

<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="logos/logo2.svg" alt="Logo" width="150" height="150">
  </a>
  <h3 align="center">Bolboreta Flight</h3>
  
</p>
<br />

## Acerca del proyecto

![Product Name Screen Shot][potalbolboreta]

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
   MYSQL_HOST=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_DATABASE=
   SENDGRID_API_KEY=<a href= "https://sendgrid.com/">Click aquí para generar</a> <br/>
   SENDGRID_FROM=**Correo desde el que envías el mail** <br/>
   SECRET=
   UPLOAD_DIRECTORY=static/uploads
   PUBLIC_HOST=http://localhost:4000/
   PORT=4000
   AMADEUS_ID=<a href= "https://developers.amadeus.com/">Click aquí para generar</a> <br/>
   AMADEUS_SECRET=<a href= "https://developers.amadeus.com/">Click aquí para generar</a> <br/>
   APP_GOOGLE_CLIENT_ID=<a href= "https://developers.google.com/identity/protocols/oauth2">Click aquí para generar</a> <br/>

6. En el .env del servidor necesitarás generar las siguientes credenciales:
   REACT_APP_PUBLIC_HOST_BACKEND=localhost
   REACT_APP_PUBLIC_PORT_BACKEND=4000
   REACT_APP_PAYPAL_CLIENTID=<a href= "https://developer.paypal.com/developer/accounts/">Click aquí para generar</a> <br/>
   PORT=4001
   REACT_APP_ACCESS_KEY_UNSPLASH=
   SECRET_KEY_UNSPLASH=

## Uso

Si quieres realizar un pago mediante Paypal usando tarjeta puedes introducir una de estas dos para validar con éxito, la fecha de caducidad debe ser posterior a la actual:

- **MASTERCARD** 2223000048400011
- **VISA** 4012888888881881

![Product Name Screen Shot][potalbolboreta]

## Licencia

Distribuido bajo licencia del MIT.

<!-- Recursos para el Readme-->

[portalbolboreta]: screenShot/portadaBolboreta.png
[payment-screenshot]: images/payment.png
