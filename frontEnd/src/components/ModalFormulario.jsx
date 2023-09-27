import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useProyect from '../hooks/useProyect'
import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'


const PRIORIDAD = [
    { id: 1, valor: 'ALTA' },
    { id: 2, valor: 'MEDIA' },
    { id: 3, valor: 'BAJA' }
]

const ModalFormularioTarea = () => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [idTarea, setIdTarea] = useState('')

    const { formularioModalTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyect()
    const { id } = useParams()

    useEffect(() => {

        if (tarea?._id) {
            setIdTarea(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setPrioridad(tarea.prioridad)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            return
        }
        setIdTarea('')
        setNombre('')
        setDescripcion('')
        setPrioridad('')
        setFechaEntrega('')


    }, [tarea])


    const handleSubmit = async e => {
        e.preventDefault()
        if ([nombre, descripcion, prioridad, fechaEntrega].includes('')) {
            mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return
        }
        await submitTarea({ nombre, descripcion, prioridad, fechaEntrega, proyecto: id, idTarea })
    
        setNombre('')
        setDescripcion('')
        setPrioridad('')
        setFechaEntrega('')

    }


    return (
        <Transition.Root show={formularioModalTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTarea}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={
                                        handleModalTarea
                                    }
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        <p
                                            className='text-center text-2xl font-bold text-gray-700'
                                        >
                                            {idTarea.length > 1 ? 'Editar Tarea' : 'Crear Tarea'}

                                        </p>

                                    </Dialog.Title>
                                    <form
                                        onSubmit={handleSubmit}

                                        className='my-10'>
                                        {
                                            alerta.msg && <Alerta alerta={alerta} />
                                        }
                                        <label className='text-gray-700 font-bold text-sm ' htmlFor="nombre">Nombre Tarea</label>

                                        <input
                                            type="text"
                                            id='nombre'
                                            placeholder='Nombre Tarea'
                                            className='w-full mt-2 p-2 border border-gray-200 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                            value={nombre}
                                            onChange={e => setNombre(e.target.value)}

                                        />
                                        <label className='text-gray-700 font-bold text-sm ' htmlFor="descripcion">Descripcion Tarea</label>
                                        <textarea
                                            rows='5'
                                            id='descripcion'
                                            placeholder='Descripcion'
                                            className='w-full mt-2 p-2 border border-gray-200 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                            value={descripcion}
                                            onChange={e => setDescripcion(e.target.value)}
                                        />
                                        <label className='text-gray-700 font-bold text-sm ' htmlFor="fecha">Fecha Limite</label>

                                        <input
                                            type="date"
                                            id='fecha'
                                            className='w-full mt-2 p-2 border border-gray-200 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                            value={fechaEntrega}
                                            onChange={e => setFechaEntrega(e.target.value)}

                                        />
                                        <label className='text-gray-700 font-bold text-sm ' htmlFor="prioridad">Prioridad</label>
                                        <select
                                            id='prioridad'
                                            className='w-full mt-2 p-2 border border-gray-200 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                            value={prioridad}
                                            onChange={e => setPrioridad(e.target.value)}
                                        >
                                            <option value=""> -- Seleccionar -- </option>
                                            {
                                                PRIORIDAD.map(prioridad => (
                                                    <option key={prioridad.id} value={prioridad.valor}>{prioridad.valor}</option>
                                                ))
                                            }
                                        </select>
                                        <input
                                            type="submit"
                                            className='bg-blue-600 hover:bg-blue-500 w-full mt-5 p-2 text-white uppercase font-bold rounded cursor-pointer'
                                            value={idTarea ? 'Guardar Tarea' : 'Crear Tarea'}
                                        />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea