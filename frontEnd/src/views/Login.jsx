/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { AuthContext } from "../context/AuthProvider"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const {auth,  setAuth } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
 
    if (!email.trim() || !password.trim()) {
      setAlerta({
        msg: "Los campos estan vacios",
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/login", { email, password })
      setAuth({
        id: data.usuarioAutenticado.id,
        token: data.usuarioAutenticado.token,
        usuario: data.usuarioAutenticado.nombre,
        correo: data.usuarioAutenticado.email,
      })
      localStorage.setItem("token", data.usuarioAutenticado.token)
      setAlerta({
        msg: data.msg,
        error: false
      })
      return navigate("/proyectos")

    } catch (error) {
      console.log(error)
    }
  }
//Validar si el usuario esta autenticado
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl"> Inicia Sesión y administra tus
        <span className="text-slate-700"> proyectos</span> </h1>
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-md p-10">
        <div className="my-5">
          <label htmlFor="email" className="uppercase  text-gray-600 block text-xl font-bold" >Correo electronico</label>
          <input
            
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500"
            type="email" id="email" name="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="uppercase  text-gray-600 block text-xl font-bold"
            htmlFor="password">Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500"
            type="password" id="password" name="password" placeholder="Escribe tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />
        }

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-600 hover:bg-sky-400 transition-color hover:cursor-pointer w-full p-3 text-white uppercase font-bold rounded mt-10 mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">¿No tienes una cuenta? Registrate</Link>
        <Link to="/olvide-password" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">Olvide mi contraseña</Link>

      </nav>
    </>
  )
}

export default Login