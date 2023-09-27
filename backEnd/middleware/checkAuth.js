import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const checkAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers

    if (authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.usuario = await Usuario.findById(decoded.id).select('-password -token -__v -confirmado -createdAt -updatedAt')
            if (!req.usuario) {
                return res.status(404).json({ msg: 'No se encontro el usuario' })
            }
            
            return next()
        }
        catch (error) {
            return res.status(401).json({ msg: error.message })
        }
    }
    else {
        return res.status(401).json({ msg: 'No autorizado, no se encontro el token' })
    }




}

export default checkAuth