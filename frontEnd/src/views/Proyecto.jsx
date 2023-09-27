import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ModalFormulario from "../components/ModalFormulario"
import useProyect from "../hooks/useProyect"
import Tarea from "../components/Tarea"
import ModalEliminar from "../components/ModalEliminar"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import Alerta from "../components/Alerta"
import useAdmin from "../hooks/useAdmin"

const Proyecto = () => {
    const { id } = useParams()
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyect()
    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(id)

    }, [])


    const { nombre } = proyecto
    if (cargando) return <h1>Cargando...</h1>

    const { msg } = alerta


    return (


        msg && alerta.error ? <Alerta alerta={alerta} /> : (
            <>

                <div className="flex justify-between mt-8">
                    <h1 className="font-black text-4xl ml-2 ">{nombre}</h1>
                    {admin &&
                        <div className="flex items-center gap-2 text-gray-400 p-4  hover:text-gray-900   uppercase font-bold">
                            <Link to={`/proyectos/editar/${id}`} className="flex gap-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                Editar</Link>
                        </div>
                    }
                </div>

                {admin &&
                    <button
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded flex gap-2 text-center ml-2 mt-2 "
                        onClick={handleModalTarea}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Nueva Tarea
                    </button>
                }

                <p className="font-bold text-3xl mt-10 text-center uppercase">Tareas del <span
                    className="text-sky-600"
                >proyecto</span></p>
                <div className="bg-white shadows m-5 p-2 rounded-lg  ">

                    {proyecto.tareas?.length ?
                        proyecto.tareas.map(tarea => (
                            <Tarea
                                key={tarea._id}
                                tarea={tarea}
                            />

                        ))
                        :
                        <p className="text-center my-5 p-5">
                            No hay tareas en este proyecto
                        </p>}
                    {admin &&
                        <>
                            <div className="flex items-center justify-between mt-10">
                                <p className="font-bold text-xl mt-10 text-center ">Colaboradores</p>

                                <Link to={`/proyectos/nuevo-colaborador/${id}`} className="text-gray-400 hover:text-gray-900  uppercase font-bold  ">
                                    AÑADIR
                                </Link>

                            </div>
                            {proyecto.colaboradores?.length ?
                                proyecto.colaboradores.map(colaborador => (
                                    <Colaborador
                                        key={colaborador._id}
                                        colaborador={colaborador}
                                    />

                                ))
                                :
                                <p className="text-center my-5 p-5">
                                    No hay colaboradores en este proyecto
                                </p>
                            }
                        </>
                    }
                </div>

                <ModalFormulario />
                <ModalEliminar />
                <ModalEliminarColaborador />
            </>
        )


    )
}

export default Proyecto