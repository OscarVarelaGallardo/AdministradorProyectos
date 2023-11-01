import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const Registrar = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if (repetirPassword !== password) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true
      })
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true
      })
      return
    }
    setAlerta({})
    try {
      const { data } = await clienteAxios.post(`/usuarios`,
        {
          nombre,
          email,
          password
        })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl"> Crea tu cuenta y administra tus
        <span className="text-slate-700"> proyectos</span> </h1>
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-md p-10">
        <div className="my-5">
          <label htmlFor="nombre" className="uppercase  text-gray-600 block text-xl font-bold" >Nombre</label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
            type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="uppercase  text-gray-600 block text-xl font-bold" >Correo electronico</label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
            type="email" id="email" name="email"
            required
            placeholder="Escribe tu correo electronico" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="my-5">
          <label
            className="uppercase  text-gray-600 block text-xl font-bold"
            htmlFor="password">Contraseña</label>
          <input
            required
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
            type="password" id="password" name="password" placeholder="Escribe tu contraseña" 
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="my-5">
          <label
            className="uppercase  text-gray-600 block text-xl font-bold"

            htmlFor="repetirpassword">Repetir Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 p-3 rounded outline-none focus:border-sky-500 mt-2"
            type="password" id="repetirpassword" name="repetirpassword" placeholder="Escribe tu contraseña"
            value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>
        {alerta.msg && <Alerta alerta={alerta} />}
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-600 hover:bg-sky-400 transition-color hover:cursor-pointer w-full p-3 text-white uppercase font-bold rounded mt-10 mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">¿Ya tienes una cuenta? Iniciar Sesión</Link>
        <Link to="/olvide-password" className="block text-center w-full lg:w-auto text-gray-600 hover:text-sky-500 transition-color ">Olvide mi contraseña</Link>

      </nav>
    </>
  )
}

export default Registrar