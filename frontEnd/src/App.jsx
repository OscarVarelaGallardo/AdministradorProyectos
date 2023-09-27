import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './views/Login'
import Registrar from './views/Registrar'
import OlvidePassword from './views/OlvidePassword'
import NuevoPassword from './views/NuevoPassword'
import ConfirmarCuenta from './views/ConfirmarCuenta'
import AuthProvider from './context/AuthProvider'
import Proyectos from './views/Proyectos'
import RutaProtegida from './layout/RutaProtegida'
import NuevoProyecto from './views/NuevoProyecto'
import ProyectProvider from './context/ProyectProvider'
import Proyecto from './views/Proyecto'
import NuevoColaborador from './views/NuevoColaborador'
import { EditarProyecto } from './views/EditarProyecto'
function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />} >
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/proyectos" element={<RutaProtegida />} >
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
            </Route>

          </Routes>
        </ProyectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
