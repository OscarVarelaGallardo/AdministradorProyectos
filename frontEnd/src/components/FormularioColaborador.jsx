import { useState } from "react"
import useProyect from "../hooks/useProyect"
import Alerta from "./Alerta"

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const { mostrarAlerta, alerta, submitColaborador } = useProyect()
 
    
    const handleSubmit = e => {
        e.preventDefault()
        if (email.trim() === '') {
            return mostrarAlerta(
                {
                    msg: 'El correo es obligatorio',
                    error: true
                })

           
        }
        submitColaborador(email)
        setEmail('')
       
      
    }
    return (
        <>
      
    
        <form
            onSubmit={handleSubmit}
            className='bg-white py-10 mx-5 md:w-1/2 rounded-md'>
               

            <label className='block text-gray-700 text-md font-bold mb-2 ' htmlFor='email'>
                Busca un colaborador
            </label>
            {
                alerta.msg && <Alerta alerta={alerta} />

            }
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder='Ingresa el correo del colaborador'
                value={email}
                onChange={e => setEmail(e.target.value)}

            />
            <input type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mt-5 w-full uppercase cursor-pointer " value="Buscar colaborador" />


        </form>
        </>
    )
}

export default FormularioColaborador