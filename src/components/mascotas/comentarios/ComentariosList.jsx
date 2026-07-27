import { useState } from "react"
import ComentarioEdit from "./ComentariosEdit";
function ComentariosList({ comentarios, onEliminarComentario, onComentarioActualizado }) {
    const [comentarioEditando, setComentarioEditando] = useState(null);
    
    if(!comentarios || comentarios.length === 0) {
        return (
            <div className="alert alert-info">
                Esta mascota aún no tiene comentarios
            </div>
        )
    }

    return (
        <>
        <h3 className="mb-4">Comentarios</h3>
        {
            comentarios.map(comentario => (
                <div key={comentario.id}
                    className="card shadow-sm mb-4 rounded-4"
                >
                    <div className="d-flex justify-content-between aling-items-center mb-3">
                        <div>
                            <h5 className="card-title fw-bold">
                                {comentario.autor}
                            </h5>

                            <small className="text-secondary">
                                {new Date(comentario.fecha_creacion).toLocaleString()}
                            </small>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => setComentarioEditando(comentario.id)}
                            >
                                Editar
                            </button>

                            <button className="btn btn-outline-danger btn-sm"
                            onClick={() => onEliminarComentario(comentario.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>

                    <p className="card-text fs-5 my-3">
                        {comentario.contenido}
                    </p>

                    {comentarioEditando === comentario.id && (
                        <div className="card bg-light mt-4 shadow-sm border-0">    
                            <div className="card-body p-4">
                                <h6 className="mb-3">
                                    Editar comentario
                                </h6>

                                <ComentarioEdit
                                    comentario={comentario}
                                    onComentarioActualizado={() => {
                                        setComentarioEditando(null)
                                        onComentarioActualizado()
                                    }}
                                />
                            </div>
                        </div>
                    )}
                        
                </div> 
            ))
        }
        </>
    )
}

export default ComentariosList