import useAuth from "./useAuth";
import useProyect from "./useProyect";


const useAdmin = () => {
    const { auth } = useAuth()
    const { proyecto } = useProyect()

    return proyecto.creador === auth.usuario._id

}


export default useAdmin