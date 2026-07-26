import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import ComentariosList from "./comentarios/ComentariosList";
import ComentariosForm from "./comentarios/ComentariosForm";
function MascotasDetail() {
    const { id } = useParams();
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null);

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setFetchError(false);
        } catch (error) {

            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error.message);

            if (error.response?.status === 404) {
                setFetchError(true);
            } else {
                alert("Ha ocurrido un error al obtener la mascota.");
            }
        }
    }   

    useEffect(() => {
        fetchMascotaDetail();
    }, []);

    const eliminarComentario = async (comentarioID) => {
        const confirmar = window.confirm("¿Está seguro de que desea eliminar este comentario?");

        if (!confirmar) {
            return;
        }
        
        try {

            await mascotasApi.delete(
                `comentarios/${comentarioID}/`
            )

            fetchMascotaDetail()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {fetchError ? (
                <p>404 - Mascota no encontrada</p>
            ) : (
                <>
                    <h2>{mascota?.nombre}</h2>
                    <img src={mascota?.imagen} alt={mascota?.nombre} />
                    <p>{mascota?.descripcion}</p>
                    <p>Edad: {mascota?.edad}</p>
                    <p>Raza: {mascota?.raza}</p>
                    <p>Estado: {mascota?.estado}</p>
                    <p>Tipo de animal: {mascota?.tipo_animal}</p>
                    <p>Sexo: {mascota?.sexo}</p>
                    <p>Tamaño: {mascota?.tamano}</p>
                    <ComentariosList 
                        comentarios={mascota?.comentarios}
                        onEliminarComentario={eliminarComentario}
                        onComentarioActualizado={fetchMascotaDetail}
                    />
                    <ComentariosForm
                        mascotaID={id}
                        onComentarioAgregado={fetchMascotaDetail}
                    />
                </>
            )}
        </div>
    )
}

export default MascotasDetail;