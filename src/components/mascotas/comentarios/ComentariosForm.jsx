import { useState } from "react";
import mascotasApi from "../../../api/api";
function ComentariosForm({ mascotaID, onComentarioAgregado }) {

    const [autor, setAutor] = useState("")
    const [contenido, setContenido] = useState("")
    
    const handleSubmit = async (e) => {

        e.preventDefault()

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

            onComentarioAgregado()

        } catch (error) {
            console.log(error)
            console.log(error.response?.status)
            console.log(error.response?.data)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Agregar Comentario</h3>

            <div>
                <label>Autor</label>

                <input 
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
            </div>

            <div>
                <label>Comentario</label>

                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                />
            </div>

            <button type="submit">
                Agregar Comentario
            </button>
        </form>
    )
}

export default ComentariosForm