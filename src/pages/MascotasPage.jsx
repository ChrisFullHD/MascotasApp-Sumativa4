import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);
    const [errores, setErrores] = useState({});

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addMascotas = async (mascota) => {
        try {
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response);
        } catch (error) {
            
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error.message);

            setErrores(error.response?.data ?? {
                general: ["Error de conexión con el servidor"]
            });


        } finally {
            fetchMascotas();
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
        <>
            <h1>Pagina Mascotas</h1>

            <MascotasList lista={mascotasList} onAdd={addMascotas} onDelete={deleteMascotas} onUpdate={updateEstado} errores={errores}/>

            <Outlet />
        </>
    )
}

export default MascotasPage;