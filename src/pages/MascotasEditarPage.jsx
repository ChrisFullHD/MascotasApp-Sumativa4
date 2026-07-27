import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mascotasApi from "../api/api";

function MascotasEditarPage() {

    const {id} = useParams();

    const [mascota, setMascota] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    const fetchMascota = async () => {
        try {

            const response = await mascotasApi.get(`mascotas/${id}/`);

            console.log(response.data);

            setMascota(response.data);

        } catch (error) {

            console.log(error);

            setFetchError(true);

        }  
    }

    useEffect(() => {
        fetchMascota();
    }, []);


    return (

    <div className="container-fluid bg-success bg-opacity-25 p-4 min-vh-100">

        <div className="container py-4">

            <div className="text-center mb-5">

           
            <h2 className="display-5 fw-bold text-success">
                Editar Mascota
            </h2>

            <p className="text-muted">
                Modifica la información de la mascota.
            </p>
        
        </div>

        {
            fetchError ? (

                <div className="alert alert-danger">
                    No fue posible cargar la mascota.
                </div>

            ) : (

                mascota && (

                    <div className="card shadow p-4">

                        <h3>{mascota.nombre}</h3>

                        <p>{mascota.descripcion}</p>

                        <p>Edad: {mascota.edad}</p>

                        <p>Estado: {mascota.estado}</p>

                    </div>

                )

            )
        }

        </div>

        </div>
        
    );
}

export default MascotasEditarPage;