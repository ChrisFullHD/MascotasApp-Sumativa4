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
    const [estados, setEstados] = useState([]);

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/")
            setEstados(response.data.estado)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerLabelEstado = (valorEstado) => {
        const estado = estados.find((e) => e.value === valorEstado)
        return estado ? estado.label : valorEstado
    }

    const obtenerColorEstado = (estado) => {
        switch (estado) {
            case "adoptada":
                return "success";
            case "en_adoption":
                return "primary";
            case "encontrada":
                return "warning";
            case "perdida":
                return "danger";
            default:
                return "secondary";
        }
    }

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
        fetchChoices();
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
                    <div className="container py-4">
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
                                        <span className={`badge bg-${obtenerColorEstado(mascota?.estado)} mb-3`}>
                                            {obtenerLabelEstado(mascota?.estado)}
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
                    <div className="container py-4">
                        <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <ComentariosForm
                                        mascotaID={id}
                                        onComentarioAgregado={fetchMascotaDetail}
                                    />
                                </div>
                        </div>
                    </div>

                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                    <ComentariosList
                                    comentarios={mascota?.comentarios}
                                    onEliminarComentario={eliminarComentario}
                                    onComentarioActualizado={fetchMascotaDetail}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MascotasDetail;