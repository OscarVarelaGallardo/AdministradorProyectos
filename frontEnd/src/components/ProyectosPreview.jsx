import { Link } from "react-router-dom"
const ProyectosPreview = ({ proyecto }) => {
    const { nombre, _id, cliente } = proyecto

       
    return (
        <div className="border-b p-5 flex">
            <p className="flex">
                {nombre}
                <span className="ml-2 
                    font-normal
                    uppercase
                text-gray-400">Cliente: {cliente} </span>
            </p>
            <Link to={`${_id}`}
            className="text-gray-600 hover:text-sky-500 ml-auto uppercase text-sm font-bold"
            > Ver Proyecto </Link>
        </div>
    )
}

export default ProyectosPreview