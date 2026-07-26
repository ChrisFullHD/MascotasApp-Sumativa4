import { useState } from "react"
import ComentarioEdit from "./ComentariosEdit";
function ComentariosList({ comentarios, onEliminarComentario, onComentarioActualizado }) {
    const [comentarioEditando, setComentarioEditando] = useState(null);
    
    if(!comentarios || comentarios.length === 0) {
        return (
            <p>No hay Comentarios para esta Mascota</p>
        )
    }

    return (
        <>
        <h3>Comentarios</h3>
        {
            comentarios.map(comentario => (
                <div key={comentario.id}>
                    <h5>{comentario.autor}</h5>
                    <p>{comentario.contenido}</p>
                    <small>
                        {new Date(comentario.fecha_creacion).toLocaleString()}
                    </small>

                    <br />

                    <button
                        onClick={() => setComentarioEditando(comentario.id)}
                        >
                            Editar
                    </button>
                    <button
                        onClick={() => onEliminarComentario(comentario.id)}
                    >
                        Eliminar
                    </button>

                    {comentarioEditando === comentario.id && (
                        <ComentarioEdit
                            comentario={comentario}
                            onComentarioActualizado={() => {
                                setComentarioEditando(null);
                                onComentarioActualizado();
                            }}
                        />
                    )}
                    <hr />
                </div> 
            ))
        }
        </>
    )
}

export default ComentariosList