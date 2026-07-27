import { useState } from "react";
import mascotasApi from "../../../api/api";
function ComentariosForm({ mascotaID, onComentarioAgregado }) {

    const [autor, setAutor] = useState("")
    const [contenido, setContenido] = useState("")
    const [mensajeError, setMensajeError] = useState("")
    
    const handleSubmit = async (e) => {

        e.preventDefault()
        setMensajeError("")

        if (!autor.trim() || !contenido.trim()) {
            setMensajeError("Debe completar todos los campos")
            return
        }

        try {
            await mascotasApi.post(

                `mascotas/${mascotaID}/comentar/`,
                {
                    autor,
                    contenido
                }
            )

            setAutor("")
            setContenido("")
            setMensajeError("")

            onComentarioAgregado()

        } catch (error) {
            console.log(error.response?.status)
            console.log(error.response?.data)

            if(error.response?.status === 400) {
                setMensajeError("Debe completar correctamente todos los campos")
            } else if (error.response?.status === 404) {
                setMensajeError("La mascota no existe")
            } else {
                setMensajeError("Ocurrió un error inesperado")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <h3>Agregar Comentario</h3>

            <div>
                <label>Autor</label>

                <input 
                    className="form-control"
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
            </div>

            <div>
                <label>Comentario</label>

                <textarea
                    className="form-control"
                    rows="3"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                />
            </div>

            {mensajeError && (
                <div className="alert alert-danger mt-3">
                    {mensajeError}
                </div>
            )}

            <button type="submit" className="btn btn-success">
                Agregar Comentario
            </button>
        </form>
    )
}

export default ComentariosForm