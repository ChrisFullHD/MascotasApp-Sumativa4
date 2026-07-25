function ComentariosList({ comentarios, onEliminarComentario }) {
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
                        onClick={() => onEliminarComentario(comentario.id)}
                    >
                        Eliminar
                    </button>
                    <hr />
                </div> 
            ))
        }
        </>
    )
}

export default ComentariosList