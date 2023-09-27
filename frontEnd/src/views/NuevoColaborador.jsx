import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyect from "../hooks/useProyect"
import { useParams, useNavigate  } from "react-router-dom"
const NuevoColaborador = () => {
    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador } = useProyect()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        obtenerProyecto(params.id)

    }, [])
   
    return (
        <>
            <button
                className="bg-green-600 hover:bg-green-500 text-white font-bold p-2 px-2 rounded mb-5 w-1/5 uppercase cursor-pointer float-right mt-2 mr-5 "
                onClick={() =>  navigate(`/proyectos/${params.id}`)}
            >Volver al proyecto </button>
            <h1 className="font-black text-2xl ">Añadir Colaborador(a) al proyecto: {proyecto.nombre} </h1>
            <div className="mt-10 flex  justify-center">

                <FormularioColaborador />
            </div>
            {
                cargando ? <p className="text-center"> Cargando...</p> : colaborador?.nombre && (
                    <div className="flex justify-center mt-10">
                       <div className="bg-white shadow rounded-lg p-5  md:w-1/2 px-5" >
                        
                            <h2 className="text-center mb-10 text-2xl font-bold ">Resultado:</h2>
                            <div className="flex justify-between items-center ">
                                <p>{colaborador.nombre}</p>
                                <button
                                    type = "button"
                                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => agregarColaborador({
                                        email: colaborador.email,
                                    })}
                                >
                                    Agregar Colaborador
                                </button>

                            </div>
                        </div>
                    </div>

                )
            }

        </>
    )
}

export default NuevoColaborador