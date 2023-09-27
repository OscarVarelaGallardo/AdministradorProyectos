import Tarea from '../models/Tarea.js'
import Proyecto from '../models/Proyecto.js'

const agregarTarea = async (req, res) => {
   
    const { nombre, descripcion, fechaEntrega, prioridad, proyecto } = req.body
    const existeProyecto = await Proyecto.findById(proyecto)
   
    if (!existeProyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ msg: error.message })
    }
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No autorizado')
        return   res.status(403).json({ msg: error.message })
    }
    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        existeProyecto.tareas.push(tareaAlmacenada)
        await existeProyecto.save()
        return res.status(201).json({msg: 'Tarea agregada correctamente', tareaAlmacenada })
    }
    catch (error) {
       return res.status(500).json({ msg: error.message })
    }


}
const obtenerTarea = async (req, res) => {
    const { id } = req.params
    //ultima tarea agregada
    const tarea = await Tarea.findById(id.trim()).populate('proyecto')
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no valida, no tienes permiso')
            return res.status(403).json({ msg: error.message })
        }
        if (!tarea) {
            const error = new Error('Tarea no encontrada')
           return  res.status(404).json({ msg: error.message })
        }
        return res.status(200).json(tarea)


}
const actualizarTarea = async (req, res) => {
    const { id } = req.params
    const tarea = await Tarea.findById(id.trim()).populate('proyecto')
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no valida, no tienes permiso')
        return res.status(403).json({ msg: error.message })
    }
    if (!tarea) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ msg: error.message })
    }
    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega
    tarea.prioridad = req.body.prioridad || tarea.prioridad
   try {
        const tareaActualizada = await tarea.save()
        return res.status(200).json(tareaActualizada)
   } catch (error) {
         return res.status(500).json({ msg: error.message })
   }
}
const eliminarTarea = async (req, res) => {
    const { id } = req.params
    const tarea = await Tarea.findById(id.trim()).populate('proyecto')
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no valida, no tienes permiso')
        return res.status(403).json({ msg: error.message })
    }
    if (!tarea) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ msg: error.message })
    }
    try {
        await tarea.deleteOne()
        return res.status(200).json({ msg: 'Tarea eliminada' })
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}
const actualizarEstadoTarea = async (req, res) => {

}


export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    actualizarEstadoTarea

}