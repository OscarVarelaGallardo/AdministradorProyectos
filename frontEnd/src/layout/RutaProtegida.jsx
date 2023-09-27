import { Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
const RutaProtegida = () => {

    const navigate = useNavigate()
    const { auth, cargando } = useAuth()

    if (cargando) return null



    return (
        <>
            {
                auth ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className=" 
                            flex-1 
                            bg-white
                            mt-10 md:mt-0 pb-10 md:pb-0">
                            <Outlet />
                        </main>
                    </div>
                </div>
                    )
                    : navigate("/")
            }

        </>
    )
}
export default RutaProtegida