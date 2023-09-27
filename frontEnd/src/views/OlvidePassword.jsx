import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const OlvidePassword = () => {
  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setAlerta({
        msg:"El campo email esta vacio",
        error:true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`,{email})
      setAlerta({
        msg:data.msg,
        error:false
      })

    } catch (error) {
  
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
    }

  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl"> Recuepera tu acceso no pierdas tus
        <span className="text-slate-700"> proyectos</span> </h1>
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-md p-10">

        <div className="my-5">
          <label htmlFor="email" className="uppercase  text-gray-600 block text-xl font-bold" >Correo electronico</label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
            type="email" id="email" name="email" placeholder="Escribe tu correo electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {
          alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />
        }
        <input
          type="submit"
          value="Enviar Instructiones"
          className="bg-sky-600 hover:bg-sky-400 transition-color hover:cursor-pointer w-full p-3 text-white uppercase font-bold rounded mt-10 mb-5"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">¿Ya tienes una cuenta? Iniciar Sesión</Link>
        <Link to="/registrar" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">¿No tienes una cuenta? Registrate</Link>

      </nav>
    </>
  )
}

export default OlvidePassword