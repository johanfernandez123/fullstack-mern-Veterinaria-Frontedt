import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `https://apv-frontend.onrender.com/api`
})

export default clienteAxios;