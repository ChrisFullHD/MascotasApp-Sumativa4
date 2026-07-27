import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import ComentariosList from "./comentarios/ComentariosList";
import ComentariosForm from "./comentarios/ComentariosForm";
function MascotasDetail() {
    const { id } = useParams();
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null);
    const [mensajeError, setMensajeError] = useState("");

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
            console.log(error.response?.status);
            console.log(error.response?.data);

            if (error.response?.status ===  404) {
                setMensajeError("El comentario ya no existe")
            } else {
                setMensajeError("No fue posible eliminar el comentario")
            }
        }
    }
    return (
        <div>

            {mensajeError && (
                <div className="alert alert-danger">
                    {mensajeError}
                </div>
            )}

            {fetchError ? (
                <p>404 - Mascota no encontrada</p>
            ) : (
                <>
                    <div className="container mt-4">
                        <div className="card shadow-lg border-0">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img src={mascota?.imagen} alt={mascota?.nombre}
                                        className="card-img-top"
                                        style={{height: "300px", objectFit: "scale-down"}}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {mascota?.nombre}
                                        </h2>
                                        <span className="badge bg-success mb-3">
                                            {mascota?.estado}
                                        </span>
                                        <p className="card-text">
                                            {mascota?.descripcion}
                                        </p>

                                        <hr />

                                        <div className="row">
                                            <div className="col-6">
                                                <strong>Edad: </strong> {mascota?.edad}
                                            </div>
                                            <div className="col-6">
                                                <strong>Raza: </strong> {mascota?.raza}
                                            </div>
                                            <div className="col-6 mt-2">
                                                <strong>Sexo: </strong> {mascota?.sexo}
                                            </div>
                                            <div className="col-6 mt-2">
                                                <strong>Tamaño: </strong> {mascota?.tamano}
                                            </div>
                                            <div className="col-6 mt-2">
                                                <strong>Tipo: </strong> {mascota?.tipo_animal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <ComentariosList
                            comentarios={mascota?.comentarios}
                            onEliminarComentario={eliminarComentario}
                            onComentarioActualizado={fetchMascotaDetail}
                        />
                    </div>

                    <div className="card shadow-sm mt-4">
                        <div className="card-body">
                            <h4 className="mb-3">
                                Agregar Comentario
                            </h4>

                            <ComentariosForm
                                mascotaID={id}
                                onComentarioAgregado={fetchMascotaDetail}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MascotasDetail;