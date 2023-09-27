import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';
import Usuario from '../models/Usuario.js';

const obtenerProyectos = async (req, res) => {

    const proyectos = await Proyecto.find(
        {
            '$or': [
                {'colaboradores': {$in: req.usuario}},
                {'creador': {$in: req.usuario}}
            ]
        }
    )
        .populate('creador', 'nombre').select('-tareas');
       
    return res.status(200).json(proyectos);

};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    try {
        const proyectoGuardado = await proyecto.save();
        return res.status(201).json(proyectoGuardado);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error' });
    }

};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id.trim()).populate('tareas').populate('colaboradores', 'nombre email');
   
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.creador.toString() !== req.usuario.id.toString() && !proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario.id.toString())) {
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }



    return res.status(200).json( proyecto );
};

const editarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id.trim());
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoGuardado = await proyecto.save();
        if (!proyectoGuardado) {
            const error = new Error('Hubo un error al actuallizadar');
            return res.status(500).json({ msg: error.message });
        }
        return res.status(201).json(proyectoGuardado);

    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al actuallizadar' });
    }

};

const eliminarProyecto = async (req, res, next) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id.trim());
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }
    try {
        await proyecto.deleteOne();
        return res.status(200).json({ msg: 'Proyecto eliminado' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al eliminar' });
    }
};

const agregarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id.trim());
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email: email.trim() }).select('-password -__v -proyectos -token -updatedAt -createdAt -confirmado -__v');

    if (!usuario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya es colaborador');
        return res.status(400).json({ msg: error.message });
    }
    proyecto.colaboradores.push(usuario._id);
    try {
        await proyecto.save();
        return res.status(201).json({ msg: 'Colaborador agregado correctamente' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al agregar el colaborador' });
    }



};

const eliminarColaborador = async (req, res) => {
   
    const proyecto = await Proyecto.findById(req.params.id.trim());
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }
    proyecto.colaboradores.pull(req.body.id);
    try {
        await proyecto.save();

        return res.status(200).json({ proyecto, msg: 'Colaborador eliminado correctamente'});
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al eliminar el colaborador' });
    }

    

};

const buscarColaborador = async (req, res) => {
 
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email: email.trim() }).select('-password -__v -proyectos -token -updatedAt -createdAt -confirmado -__v');
    if (!usuario) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ msg: error.message });
    }
    return res.status(200).json(usuario)
   
};



export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador



}
