import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mascotasApi from "../api/api";

function MascotasEditarPage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [mascota, setMascota] = useState(null);
    const [fetchError, setFetchError] = useState(false);
    const [form, setForm] = useState(null);
    const [estados, setEstados] = useState([]);


    const fetchMascota = async () => {
        try {

            const response = await mascotasApi.get(`mascotas/${id}/`);

            console.log(response.data);

            setMascota(response.data);
            setForm(response.data);

            const choices = await mascotasApi.get("choices/")
            setEstados(choices.data.estado);

        } catch (error) {

            console.log(error);

            setFetchError(true);

        }  
    }

    useEffect(() => {
        fetchMascota();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

                await mascotasApi.patch(
                    `mascotas/${id}/`,
                    {
                        nombre: form.nombre,
                        descripcion: form.descripcion,
                        edad: form.edad,
                        estado: form.estado
                    }
                );

                alert("Mascota actualizada correctamente");

                navigate("/mascotas");

        } catch (error) {

        console.log(error.response?.status);
        console.log(error.response?.data);
        console.log(error.message);

        if (error.response?.status === 400) {

                    alert("Los datos ingresados no son válidos.");

                } else if (error.response?.status === 404) {

                    alert("La mascota no fue encontrada.");

                } else {

                    alert("Ha ocurrido un error al actualizar la mascota.");

                }

        }

    }


    return (

    <div className="container-fluid bg-success bg-opacity-25 p-4 min-vh-100">

        <div className="container py-4">

            <div className="text-center mb-5">

           
            <h2 className="display-5 fw-bold text-success">
                Editar Mascota
            </h2>

            <p className="text-muted">
                Modifica la información de la mascota.
            </p>
        
        </div>

        {
            fetchError ? (

                <div className="alert alert-danger">
                    No fue posible cargar la mascota.
                </div>

            ) : (

                form && (

                    <div className="card shadow">

                        <div className="card-header bg-success text-dark text-center">
                            <h3>Datos</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                            <div className="text-center mb-4">

                                <img
                                    src={form.imagen}
                                    alt={form.nombre}
                                    className="img-fluid rounded shadow"
                                    style={{
                                        maxHeight: "300px",
                                        objectFit: "contain"
                                    }}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Nombre
                                </label>

                                <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange}/>

                        </div>

                        <div className="mb-3">
                            
                            <label className="form-label">
                                Descripción
                            </label>

                            <textarea className="form-control" row="3" name="descripcion" value={form.descripcion} onChange={handleChange}/>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Edad
                            </label>

                            <input type="number" className="form-control" name="edad" value={form.edad} onChange={handleChange}/>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Estado
                            </label>

                            

                            <select
                                className="form-select"
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                            >

                                {
                                    estados.map((estado) => (

                                        <option
                                            key={estado.value}
                                            value={estado.value}
                                        >
                                            {estado.label}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                        <div className="d-grid gap-2 mt-4">

                            <button type="submit" className="btn btn-success">
                                Guardar Cambios
                            </button>

                        </div>

                        </form>

                        </div>

                        </div>

                )

            )
        }

        </div>

        </div>
        
    );
}

export default MascotasEditarPage;