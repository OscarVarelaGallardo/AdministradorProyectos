import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador
    
} from '../controllers/proyectoControllers.js';

const router = express.Router();

router
    .route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto);
router
    .route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto);
    

router.post('/agrear-colaboradores/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaborador/:id', checkAuth,  eliminarColaborador);

router.post('/colaboradores', checkAuth, buscarColaborador);

export default router;

