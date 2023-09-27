import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
import generateToken from '../helpers/jsonWebToken.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js';

const registrar = async (req, res) => {
    const { email } = req.body;
    const existeEmail = await Usuario.findOne({ email })

    if (existeEmail) {
        const error = new Error('El email ya está registrado')
        return res.status(400).json({ msg: error.message })
    }
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save()
        if (!usuarioAlmacenado) {
            return res.status(400).json({ msg: 'No se pudo registrar el usuario, revisa tu correo para confirmar tu cuenta' })
        }
        emailRegistro({
            
            email: usuarioAlmacenado.email,
            nombre: usuarioAlmacenado.nombre,
            token: usuarioAlmacenado.token
            
        })
       return res.json({ msg: 'Usuario registrado correctamente, revisa tu correo electronico para confirmar tu cuenta' })

    } catch (error) {
       return res.status(500).json({ msg: 'Hubo un error' })
    }


}

const autenticar = async (req, res) => {

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }
    if (usuario.confirmado === false) {
        const error = new Error('Tu cuenta no a sido confirmada')
        return res.status(404).json({ msg: error.message })
    }

    if (await usuario.comparePassword(password)) {

        const token = generateToken(usuario._id)
        try{
            usuario.token = token;
            await usuario.save();
            const usuarioAutenticado = {    
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                token: usuario.token,
            }
            return res.status(200).json({ msg: 'Usuario autenticado correctamente', usuarioAutenticado
        })

        }catch(error){
            return res.status(500).json({ msg: 'Hubo un error al autenticar el usuario' })

        }   
       

    }
    else {
        const error = new Error('Password incorrecto')
        return res.status(404).json({ msg: error.message })

    }
}
const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token })
    if (!usuarioConfirmar) {
        const error = new Error('El token no es valido')
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = null;
        await usuarioConfirmar.save();
        return res.status(200).json({ msg: 'Usuario confirmado correctamente' })

    } catch (error) {
        return res.status(500).json({ msg: 'Hubo token  error al confirmar el ' })

    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuario.token = generarId();
        await usuario.save();
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        
        return res.status(200).json({ msg: 'Se envio un email para reestablecer tu password' })
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al enviar el email' })

    }

}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token })
    if (!tokenValido) {
        const error = new Error('El token no es valido')
        return res.status(404).json({ msg: error.message })
    }

    return res.status(200).json({ msg: 'Token valido y el usuario existe' })

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token })
    if (!usuario) {
        const error = new Error('El token no es valido')
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuario.password = password;
        usuario.token = null;
        await usuario.save();
        return res.status(200).json({ msg: 'Password actualizado correctamente' })
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al actualizar el password' })

    }

}
    const perfil = async (req, res) => {
        const {usuario} = req;
        res.json({usuario})
    }



export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword , perfil}