import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import cors from 'cors'

dotenv.config()

const whiteList = [
   process.env.FRONTEND_URL
   
]

const corsOptions = {
    origin: (origin, callback) => {
        const existe = whiteList.some(dominio => dominio === origin)
        if(existe){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}


const app = express()

app.use(express.json())

app.use(cors(
     corsOptions
))



const PORT = process.env.PORT || 4000

conectarDB()


//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

