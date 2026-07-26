import { useState } from "react";
import mascotasApi from "../../../api/api";

function ComentarioEdit({ comentario, onComentarioActualizado}) {
    const [contenido, setContenido] = useState(comentario.contenido)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await mascotasApi.patch(
                `comentarios/${comentario.id}/`,
                {
                    contenido
                }
            )

            onComentarioActualizado();
        } catch (error) {
            console.log(error)
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
