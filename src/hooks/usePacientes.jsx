import { useContext } from "react";
import PacientesContext from "../content/PacientesProvider";

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes