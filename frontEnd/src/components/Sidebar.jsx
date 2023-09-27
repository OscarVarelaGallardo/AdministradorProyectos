import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Sidebar = () => {

  const { auth } = useAuth()

  if (!auth.token) return null

  return (

    <aside className='md:w-80 lg:w-96 px-5 py-10'>
      <p className='text-xl font-bold '>
         Nombre: {auth.usuario?.nombre}
        <Link to='crear-proyecto'
          className='text-white w-full block bg-sky-600 uppercase  rounded-md p-2 mt-5 text-center
         hover:bg-sky-700 transition duration-300 ease-in-out
         '>Nuevo Proyecto</Link>
      </p>
    </aside>
  )
}

export default Sidebar