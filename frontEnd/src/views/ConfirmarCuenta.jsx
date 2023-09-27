import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const params = useParams()
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const respuesta = await clienteAxios(`/usuarios/confirmar/${id}`)
        const { data } = respuesta
        console.log(data)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        setCuentaConfirmada(false)

      }
    }
    return () =>{
    confirmarCuenta()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Confirma tu cuenta y comienza a crear tus
        <span className="text-slate-700"> proyectos</span> </h1>
      <div className="
        mt-20 md:mt-10 shadow-lg px5 px-5 py-10 rounded-xl bg-white
      " >
        {msg && <Alerta alerta={alerta} />}
    
      {
        cuentaConfirmada && (
          <Link to="/" className="text-sky-600 font-black text-2xl 
      hover:text-sky-700 flex justify-center
      ">Inicia sesión</Link>
        )

      }
      </div>
    </>
  )
}

export default ConfirmarCuenta