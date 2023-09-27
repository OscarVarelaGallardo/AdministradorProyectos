import useProyect from "../hooks/useProyect"


const Colaborador = ({ colaborador }) => {
    const { handleModalEliminarColaborador, } = useProyect()
    return (
        
        <div className=" justify-between items-center mb-1 bg-white  rounded-lg p-5  md:w-full px-5  shadow-md flex ">
            <div >
                <p
                    className="text-gray-900 font-bold text-sm"
                >{colaborador.nombre}</p>
                <p
                    className="text-gray-400 hover:text-gray-900 font-bold   text-sm"
                > {colaborador.email}</p>
            </div>
            <div>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded "
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        </div>

    )
}

export default Colaborador