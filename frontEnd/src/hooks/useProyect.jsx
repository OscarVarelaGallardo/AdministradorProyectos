import { useContext } from "react"
import { ProyectContext } from "../context/ProyectProvider"
const useProyect = () => {
    return useContext(ProyectContext)
}

export default useProyect