import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos;

    const  transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    //

    const info = await transport.sendMail({
        from: "'UpTask -Administrador de Proyectos 👻' <cuentas@uptask.com>",
        to: email,
        subject: "✅Confirma tu cuenta en UpTask  ✅",
        html: `
        <html>
            <head>
                <style>
                    .boton{
                        background-color: #00838f;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <h1>¡Bienvenido a UpTask! </h1>
                <p>Hola ${nombre}, gracias por registrarte en UpTask, tu cuenta esta casi lista, solo falta que la confirmes</p>
                <p>Para confirmar tu cuenta, da click en el siguiente botón</p>
                <a class="boton" href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
                <p>Si no has solicitado este correo, puedes ignorarlo</p>
            </body>
        </html>
        `
    });
};

const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    //

    const info = await transport.sendMail({
        from: "'UpTask -Administrador de Proyectos 👻' <cuentas@uptask.com>",
        to: email,
        subject: "📪 Restablece tu cuenta en UpTask  📪",
        html: `
        <html>
            <head>
                <style>
                    .boton{
                        background-color: #00838f;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <h1>¡Restablece tu contraseña en  UpTask! </h1>
                <p>Hola ${nombre}, hemos recibido una solicitud para restablecer tu contraseña, si no has sido tu, ignora este correo</p>
                <p>Para restablecer tu contraseña, da click en el siguiente botón</p>
                <a class="boton" href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a>
                
                <p>Si el botón no funciona, copia y pega el siguiente enlace en tu navegador</p>
                <p>${process.env.FRONTEND_URL}/olvide-password/${token}</p>
             
                <p>Si tienes alguna duda, puedes contactarnos en <a href="mailto:
                ${process.env.EMAIL_CONTACTO}">${process.env.EMAIL_CONTACTO}</a></p>

            </body>
        </html>
        `
    });
}

export {emailRegistro , emailOlvidePassword}