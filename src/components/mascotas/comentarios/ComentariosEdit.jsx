import { useState } from "react";
import mascotasApi from "../../../api/api";

function ComentarioEdit({ comentario, onComentarioActualizado}) {
    const [contenido, setContenido] = useState(comentario.contenido)
    const [mensajeError, setMensajeError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMensajeError("")
        
        try {
            await mascotasApi.patch(
                `comentarios/${comentario.id}/`,
                {
                    contenido
                }
            )

            onComentarioActualizado();
        } catch (error) {
            console.log(error.reponse?.status)
            console.log(error.reponse?.data)

            if (error.reponse?.status === 400) {
                setMensajeError("Los datos ingresador no son válidos")
            } else if (error.reponse?.status === 404) {
                setMensajeError("El comentario ya no existe")
            } else {
                setMensajeError("No fue posible actualizar el comentario")
            }

        }
    };
    return (
        <form onSubmit={handleSubmit}>

            <label>Comentario</label>

            <textarea 
                value={contenido}
                onChange={(e) =>setContenido(e.target.value)}
            />

            <button type="submit">
                Guardar cambios
            </button>
        </form>
    )
};

export default ComentarioEdit;
