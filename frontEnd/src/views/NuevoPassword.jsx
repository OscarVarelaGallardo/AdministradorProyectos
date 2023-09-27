import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const NuevoPassword = () => {
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const { token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(password)
    if (!password.trim()) {
      setAlerta({
        msg: "El campo password esta vacio",
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPassword("")
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setPasswordModificado(false)
    }
  }

  useEffect(() => {
 const tokenValido = async () => {
    try {
      await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
    } catch (error) {
      setTokenValido(false)
      setPasswordModificado(false)
    }
  }
  tokenValido()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl"> Restable tu contraseña y administra tus
        <span className="text-slate-700"> proyectos</span> </h1>
     {
        tokenValido ? (<form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-md p-10">
          <div className="my-5">
            <label
              className="uppercase  text-gray-600 block text-xl font-bold"
              htmlFor="password">Nueva Contraseña</label>
            <input
              className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
              type="password" id="password" name="password" placeholder="Escribe tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {
            alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />
          }
          <input
            type="submit"
            value="Guardar nueva contraseña"
            className="bg-sky-600 hover:bg-sky-400 transition-color 
              hover:cursor-pointer w-full
              p-3 text-white uppercase
              font-bold rounded mt-10 mb-5"
          />
        </form>
        ) : (
          <div className="my-10 bg-white shadow rounded-md p-10">
           <Alerta alerta={{msg:"El token no es valido",error:true}}/>
          </div>
        )

     }
      {
        passwordModificado && (
          <Link to="/" className="text-gray-600 hover:text-sky-400 transition-color flex justify-center ">Iniciar Sesion</Link>
        )

      }
     

    </>
  )
}

export default NuevoPassword