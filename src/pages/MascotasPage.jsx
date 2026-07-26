import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Link, Outlet } from "react-router-dom";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        } catch (error) {
            console.log(error);
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
        <div className="container my-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Mascotas</h1>

            <Link to="/mascotas/crear" className="btn btn-success">
                Registrar mascota
            </Link>
        </div>

            <MascotasList lista={mascotasList} onDelete={deleteMascotas} onUpdate={updateEstado} />

            <Outlet />
            
        </div>
    )
}

export default MascotasPage;