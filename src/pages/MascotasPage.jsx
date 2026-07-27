import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Link, Outlet } from "react-router-dom";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);
    const [errorConexion, setErrorConexion] = useState(false);

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
            setErrorConexion(false);
        } catch (error) {
            console.log(error);

            setErrorConexion(true);
        }
    }



    const updateEstado = async (id, estado) => {
        try {
            await mascotasApi.patch(`mascotas/${id}/`, {
                estado: estado
            });

            fetchMascotas();
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error.message);

            if (error.response?.status === 400) {
                alert("No fue posible actualizar el estado de la mascota.");
            } else if (error.response?.status === 404) {
                alert("La mascota no fue encontrada.");
            } else {
                alert("Ha ocurrido un error al actualizar la mascota.");
            }
        }
    }

    const deleteMascotas = async (id) => {

        const confirmar = window.confirm("¿Está seguro de que desea eliminar esta mascota?");

        if (!confirmar) {
            return;
        }

        try {
            await mascotasApi.delete(`mascotas/${id}/`);
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error.message);

            if (error.response?.status === 404) {
                alert("La mascota no fue encontrada.");
            } else {
                alert("Ha ocurrido un error al eliminar la mascota.");
            }

        } finally {
            await fetchMascotas();
        }
    }

    useEffect(() => {
        fetchMascotas();
    }, [])

    return (
        <div className="container-fluid bg-success bg-success bg-opacity-25 p-4 min-vh-100">

            <div className="container py-4">
                <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success">Página de Mascotas</h1>

            <p className="text-muted fs-5">
                Encuentra un nuevo compañero o registra una mascota.
            </p>

            <Link to="/mascotas/crear" className="btn btn-success">
                Registrar mascota
            </Link>
        </div>

            {
    errorConexion ? (

        <div className="alert alert-danger text-center">

            <h4>No fue posible conectar con el servidor</h4>

            <p>
                Verifica tu conexión a Internet o intenta nuevamente más tarde.
            </p>

            <button
                className="btn btn-outline-danger"
                onClick={fetchMascotas}
            >
                Reintentar
            </button>

        </div>

    ) : (

        <MascotasList
            lista={mascotasList}
            onDelete={deleteMascotas}
            onUpdate={updateEstado}
        />

    )
}

            <Outlet />
            
        </div>
        </div>
    )
}

export default MascotasPage;