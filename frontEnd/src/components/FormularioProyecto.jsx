import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import useProyect from "../hooks/useProyect"
import { useParams } from "react-router-dom"

const FormularioProyecto = () => {
    const [nombre, setNombre] = useState('')
    const [identificador, setIdentificador] = useState(null)
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const { mostrarAlerta, alerta, submitProyect, proyecto } = useProyect()
    const { id } = useParams()

    useEffect(() => {
        if (id && proyecto.nombre) {
            setIdentificador(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
        
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()
       
        if (nombre.trim() === '' || descripcion.trim() === '' || fechaEntrega.trim() === '' || cliente.trim() === '') {
            return mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true })
        }
        await submitProyect({ id, nombre, descripcion, fechaEntrega, cliente })
        setIdentificador(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')


    }


    return (
        <form
            onSubmit={handleSubmit}
            className=" bg-white py-10 px-5 md:w-5/6 font-bold text-sm shadow-md" >
            <div className="mb-5">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2 uppercase"
                    htmlFor="nombre">Nombre proyecto</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del proyecto"
                    className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2 uppercase"
                    htmlFor="descripcion">Descripción</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion del proyecto"
                    className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2 uppercase"
                    htmlFor="fecha-entrega">Fecha de entrega</label>
                <input
                    type="date"
                    id="fechaEntrega"
                    name="fechaEntrega"

                    className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2 uppercase"
                    htmlFor="cliente">Nombre cliente</label>
                <input
                    type="text"
                    id="cliente"
                    name="cliente"
                    placeholder="Nombre del cliente"
                    className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>
            {
                alerta.msg && <Alerta alerta={alerta} />
            }
            <input
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-3 px-4 rounded-lg w-3/6 uppercase cursor-pointer  block text-center mx-auto"
                value={identificador ? 'Editar proyecto' : 'Crear proyecto'}
            />


        </form>
    )
}

export default FormularioProyecto