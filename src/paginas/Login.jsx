import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate()

  const {setAuth} = useAuth();

  const handleSubmit = async (e) =>{
      e.preventDefault();

    const validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

      
      if([email,password].includes("")){
        setAlerta({
          msg: "Todos los campos son obligatorios",
          error: true
        });
        return;
      }

      if(!validarCorreo.test(email)){
        setAlerta({
          msg: 'Formato de correo invalido',
          error: true
      })

      return;
      }

      if(password.length < 6){
        setAlerta({msg:'La contraseña es muy corta, agrega minimo 6 caracteres', error:true}) 
        return
      }


      try {
        const url = '/veterinarios/login'
        const {data} = await clienteAxios.post(url,{
          email,
          password
        })
        localStorage.setItem('token',data.token);
        setAuth(data)
        navigate('/admin')
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }

  }

  const {msg} = alerta;
  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus
          <span className="text-black"> Pacientes </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {
          msg && 
          <Alerta
        alerta={alerta}
        />
        }
        <form 
        onSubmit={handleSubmit}
        >
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full px-10 py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una cuenta? Regístrate
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

export default Login