# AdministradorProyectos
Esta dividido en dos carpetas una para el backend y otra para el frontend
## Backend
### Instalación
Para instalar las dependencias del backend se debe ejecutar el siguiente comando en la carpeta backend
```
npm install
```
### Ejecución
Para ejecutar el backend se debe ejecutar el siguiente comando en la carpeta backend
```
npm start
```
## Frontend
### Instalación
Para instalar las dependencias del frontend se debe ejecutar el siguiente comando en la carpeta frontend
```
npm install
```
### Ejecución
Para ejecutar el frontend se debe ejecutar el siguiente comando en la carpeta frontend
```
npm start
```

Cambiar las variables de entorno
En el archivo .env se deben cambiar las variables de entorno para que funcione correctamente el proyecto
```
Esta es la configuración por defecto
```
Tienen que cambiarla a una que ustedes generen en su cuenta de mongo atlas
```
MONGO_URI='mongodb+srv://root:root@merntask1243.ttbsfxf.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET= 'secret'

FRONTEND_URL = 'http://localhost:5173'

//Configuracion de correo
Tienen que configurar un correo en mailtrap.io y cambiar las variables de entorno


EMAIL_USER = "3c4420a64afc32"
EMAIL_PASS = "63d6c098eeb9de"
EMAIL_HOST = "sandbox.smtp.mailtrap.io"
EMAIL_PORT = 2525


