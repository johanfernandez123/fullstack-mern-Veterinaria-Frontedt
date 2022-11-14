import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';


import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import { AuthProvider } from './content/AuthContext';
import { PacientesProvider } from './content/PacientesProvider';

import AdministrarPacientes from './paginas/AdministrarPacientes';
import CambiarPassword from './paginas/CambiarPassword';
import EditarPerfil from './paginas/EditarPerfil';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            {/* Areaa publica */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
            </Route>

            {/* Area privada */}

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil/>} />
              <Route path='cambiar-password' element={<CambiarPassword/>} />
            </Route>


          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
