import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <header className="px-4 bg-white border-b">
            <div className='md:flex md:justify-between md:items-center md:px-4 md:py-3'>
                <h2 className='text-4xl text-sky-600 font-black uppercase cursor-pointer hover:text-sky-700 transition duration-300 ease-in-out'
                    onClick={() => navigate('/proyectos')}
                >Administrador de Proyectos</h2>
                <input type='search'
                    placeholder='Buscar Proyecto'
                    className="rounded-lg lg:w-96 block p-2 border">
                </input>
                <div className='flex items-center gap-3'>
                    <Link to='/proyectos'
                        className='font-bold uppercase'
                    >Proyectos</Link>
                    <button className='text-white text-sm bg-sky-600 p-3 uppercase font-bold rounded-md'
                        onClick={() => { localStorage.removeItem('token')
                        navigate('/')
                    }}
                    >Cerrar Sesión</button>
                </div>
            </div>
        </header>
    )
}

export default Header