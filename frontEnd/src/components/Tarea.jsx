import { formatearFecha } from "../helpers/formatearFecha"
import useProyect from "../hooks/useProyect"
import useAdmin from "../hooks/useAdmin"
const Tarea = ({ tarea }) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyect()
    const admin = useAdmin()


    return (
        <>
            <div className="border bg-white p-4  items-center rounded-md mb-1 shadow-md flex justify-between "  >
                <div>
                    <p className="text-xl mb-1" >
                        {nombre}
                    </p>
                    <p className="text-sm mb-1 text-gray-500 uppercase " >
                        {
                            `Descripcion: ${descripcion}`
                        }
                    </p>
                    <p className="text-sm mb-1  text-black-500 uppercase " >
                        {
                            `Fecha de entrega: ${formatearFecha(fechaEntrega)}`
                        }
                    </p>
                    <p className=
                        {`text-xl mb-1 uppercase ${prioridad === 'ALTA' ? 'text-red-600' : prioridad === 'MEDIA' ? 'text-yellow-500' : 'text-green-600'}`}
                    >
                        {
                            `Prioridad: ${prioridad}`
                        }
                    </p>
                </div>
                {admin &&
                    <div className="flex gap-2">
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded   text-center ml-2  uppercase"
                            onClick={() => handleModalEditarTarea(tarea)}
                        >
                            Editar
                        </button>
                   
                            <button className={`${estado ? 'bg-green-600 hover:bg-green-500': 'bg-yellow-600 hover:bg-yellow-500'}
                             text-white font-bold py-2 px-4 rounded  text-center ml-2 uppercase`}
                                onClick={() => completarTarea(_id)}>
                               {
                                      estado ? 'Completada' : 'Incompleta'
                               }
                            </button>
                       
                        <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded   text-center ml-2"
                            onClick={() => handleModalEliminarTarea(tarea)}
                        >
                            Eliminar
                        </button>
                    </div>
                }
            </div>



        </>
    )
}

export default Tarea