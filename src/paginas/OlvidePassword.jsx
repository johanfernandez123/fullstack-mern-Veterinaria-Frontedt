import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"



function OlvidePassword() {

    const [correo, setCorreo] = useState("");
    const [alerta, setAlerta] = useState({});

    const validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(correo === ''){
            setAlerta({
                msg: 'El Correo es obligatorio',
                error: true
            })
        return;
        }

        if(!validarCorreo.test(correo)){
            setAlerta({
                msg: 'Formato de correo invalido',
                error: true
            })

            return;
        }

        try {
            const url = `/veterinarios/olvide-password`
            const {data} = await clienteAxios.post(url,{
                email: correo
            })

            setAlerta({
                msg: data.msg,
                error:false
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

        // const {data} =
    }


    const {msg} = alerta;
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu acceso y no Piersas
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
                    <input
                        type="submit"
                        value="Recuperar Contraseña"
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
                        to="/registrar"
                        className="block text-center my-5 text-gray-500"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword