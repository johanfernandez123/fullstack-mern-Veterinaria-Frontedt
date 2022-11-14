import { useState } from 'react'
import {Link} from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

function Registrar() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [reptirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([nombre,correo,password,reptirPassword].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error:true})
      return;
    }

    if(password !== reptirPassword){
      setAlerta({msg:'Las contraseña no coinciden', error:true})
      return;
    }

    if(password.length < 6){
      setAlerta({msg:'La contraseña es muy corta, agrega minimo 6 caracteres', error:true}) 
      return
    }

    setAlerta({});

    // crear el usuario en la api
    const url = `/veterinarios`;
    try {
      await clienteAxios.post(url, {nombre,email:correo,password});
      setAlerta({
        msg: "Registro exitoso, revisa tu correo",
        error: false
      })

      setNombre("");
      setCorreo("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra
          <span className="text-black"> tus Pacientes </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && 
        <Alerta
        alerta={alerta}
        />
        }
        
        <form 
        onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Correo
            </label>

            <input
              id="email"
              type="email"
              placeholder="Ingrese su correo"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="repit-password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Contraseña
            </label>

            <input
              id="repit-password"
              type="password"
              placeholder="Repite tu Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={reptirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
              type="submit"
              value="Crear Cuenta"
              className="bg-indigo-700 w-full px-10 py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-indigo-800 md:w-auto"
            />
        </form>


        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            ¿Ya Tienes una Cuenta? Inicia Sesión
          </Link>

          <Link 
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar