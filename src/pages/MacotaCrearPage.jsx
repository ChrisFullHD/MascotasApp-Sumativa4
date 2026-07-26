import MascotasForm from "../components/mascotas/MascotasForm";
import mascotasApi from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MascotasCrearPage() {

    const navigate = useNavigate();
    const [errores, setErrores] = useState({}); 

    const addMascotas = async (mascota) => {
        try {

                await mascotasApi.post("mascotas/", mascota);

                alert("Mascota registrada correctamente.");

                navigate("/mascotas");

            } catch (error) {

                console.log(error.response?.status);
                console.log(error.response?.data);
                console.log(error.message);

                setErrores(
                    error.response?.data ??
                    {
                        general: ["Error de conexión con el servidor"]
                    }
                );

            }
    };


    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">
                Registrar Mascota
            </h2>
            <MascotasForm onAdd={addMascotas} errores={errores}/>
        </div>
    );
}


export default MascotasCrearPage