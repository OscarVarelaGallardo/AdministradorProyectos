import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
const ProyectContext = createContext()

const ProyectProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([])
  const [proyecto, setProyecto] = useState([])
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [formularioModalTarea, setFormularioModalTarea] = useState(false)
  const [tarea, setTarea] = useState({})
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [colaborador, setColaborador] = useState({})
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)

  const navigate = useNavigate()



  const agregarColaborador = async email => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/agrear-colaboradores/${proyecto._id}`, email, config)

      setAlerta({ msg: data.msg, error: false })
      setColaborador({})
      setTimeout(() => {
        setAlerta({})

      }, 3000);


    } catch (error) {
      console.log(error)
      setAlerta({ msg: error.response.data.msg, error: true })
    }

  }

  const submitColaborador = async email => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/colaboradores/`, { email }, config)

      setColaborador(data)
      setAlerta({})


    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
      setColaborador({})
    } finally {
      setCargando(false)
    }

  }
  const eliminarTarea = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      await clienteAxios.delete(`/tareas/${id}`, config)
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tarea => tarea._id !== id)
      setProyecto(proyectoActualizado)
      setAlerta({ msg: 'Tarea eliminada correctamente', error: false })
      setTimeout(() => {
        setAlerta({})
        setModalEliminarTarea(false)
      }, 500);

    } catch (error) {
      console.log(error)
    }

  }

  const handleModalEliminarTarea = tarea => {
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const handleModalEditarTarea = tarea => {

    setTarea(tarea)
    setFormularioModalTarea(!formularioModalTarea)

  }
  const handleModalTarea = () => {
    setFormularioModalTarea(!formularioModalTarea)
    setTarea({})
  }
  const submitTarea = async tarea => {
    //idTarea
    if (tarea.idTarea) {
      await editarTarea(tarea)
    } else {
      await nuevaTarea(tarea)
    }


  }

  const editarTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/tareas/${tarea.idTarea}`, tarea, config)


      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tarea => tarea._id === data._id ? data : tarea)
      setProyecto(proyectoActualizado)



      setAlerta({})
      setFormularioModalTarea(false)

    } catch (error) {
      console.log(error)
    }


  }

  const nuevaTarea = async tarea => {


    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/tareas', tarea, config)
      //Agregar tarea al state
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = [...proyectoActualizado.tareas, data.tareaAlmacenada]
      setProyecto(proyectoActualizado)
      setAlerta({ msg: 'Tarea creada correctamente', error: false })
      setTimeout(() => {
        setAlerta({})
        setFormularioModalTarea(false)
      }, 1000);

    } catch (error) {
      console.log(error)
    }
  }


  const mostrarAlerta = alerta => {
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 2000);
  }

  const eliminarProyecto = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      await clienteAxios.delete(`/proyectos/${id}`, config)
      const proyectosActualizados = proyectos.filter(proyecto => proyecto._id !== id)
      setProyectos(proyectosActualizados)
      setAlerta({ msg: 'Proyecto eliminado correctamente', error: false })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }


  const submitProyect = async proyect => {
    if (proyect.id) {
      await actualizarProyecto(proyect)
    }
    else {
      await nuevoProyecto(proyect)
    }

  }

  const actualizarProyecto = async proyect => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyect.id}`, proyect, config)
      const proyectosActualizados = proyectos.map(proyecto => proyecto._id === data._id ? data : proyecto)
      setProyectos(proyectosActualizados)
      setAlerta({ msg: 'Proyecto actualizado correctamente', error: false })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }
  const nuevoProyecto = async proyect => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }
      }
      const { data } = await clienteAxios.post('/proyectos', proyect, config)
      setProyectos([...proyectos, data])
      setAlerta({ msg: 'Proyecto creado correctamente', error: false })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 1500);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return null
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await clienteAxios.get('/proyectos', config)
        setProyectos(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()

  }, [])



  const obtenerProyecto = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return null
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)
      setAlerta({})
    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
    }

  }





  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)


  }

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
      setProyecto(proyectoActualizado)
      setAlerta({ msg: 'Colaborador eliminado correctamente', error: false })
      setModalEliminarColaborador(false)
      setColaborador({})
      setTimeout(() => {
        setAlerta({})
      }, 500);



    } catch (error) {
      console.log(error)
    }
  }
  const completarTarea = async id => {
    console.log(id)
  }


  return (
    <ProyectContext.Provider value={{
      completarTarea,
      proyectos,
      mostrarAlerta,
      alerta,
      submitProyect,
      obtenerProyecto,
      proyecto,
      cargando,
      eliminarProyecto,
      handleModalTarea,
      formularioModalTarea,
      submitTarea,
      handleModalEditarTarea,
      tarea,
      handleModalEliminarTarea,
      modalEliminarTarea,
      eliminarTarea,
      submitColaborador,
      colaborador,
      agregarColaborador,
      handleModalEliminarColaborador,
      modalEliminarColaborador,
      eliminarColaborador


    }}>
      {children}
    </ProyectContext.Provider>
  )
}

export { ProyectContext }
export default ProyectProvider