import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import { Link } from "react-router-dom";

function MascotasForm({ onAdd, errores }) {
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [selectedEstado, setEstado] = useState("");
    const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState("");
    const [selectedSexo, setSexoSeleccionado] = useState("");
    const [selectedTamano, setTamanoSeleccionado] = useState("");
    const [imagen, setImagen] = useState(null);

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);

            if (response.data.estado.length > 0) {
                setEstado(response.data.estado[0].value);
            }

            if (response.data.tipo_animal.length > 0) {
                setTipoMascotaSeleccionada(response.data.tipo_animal[0].value);
            }

            if (response.data.sexo.length > 0) {
                setSexoSeleccionado(response.data.sexo[0].value);
            }

            if (response.data.tamano.length > 0) {
                setTamanoSeleccionado(response.data.tamano[0].value);
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(nombre, descripcion, edad, raza, selectedEstado, selectedTipoMascota, selectedSexo, selectedTamano, imagen);
        console.log(imagen);
        
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", edad);
        formData.append("raza", raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoMascota);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamano);
        formData.append("imagen", imagen);

        onAdd(formData);
    }

    const traducirError = (mensaje) => {
        switch (mensaje) {
            case "This field may not be blank.":
                return "Este campo no puede estar vacío.";

            case "The submitted data was not a file. Check the encoding type on the form.":
                return "Debe seleccionar una imagen.";

            case "This field may not be blank.":
                return "Este campo no puede estar vacío."

            default:
                return mensaje;
        }
    };






    return (
    <div className="container my-4">
        <div className="row justify-content-center">
            <div className="col-md-8">

                <div className="card shadow">

                    <div className="card-header bg-success text-white text-center">
                        <h3>Registrar Mascota</h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                            <div className="mb-3">
                                <label className="form-label">Nombre</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />

                                {errores.nombre && (
                                    <div className="text-danger">
                                        {traducirError(errores.nombre[0])}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen</label>

                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImagen(e.target.files[0])}
                                />

                                {errores.imagen && (
                                    <div className="text-danger">
                                        {traducirError(errores.imagen[0])}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>

                                {errores.descripcion && (
                                    <div className="text-danger">
                                        {traducirError(errores.descripcion[0])}
                                    </div>
                                )}
                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Edad</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Raza</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={raza}
                                        onChange={(e) => setRaza(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Estado
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedEstado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        {
                                            estados.map(e => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Tipo Animal
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedTipoMascota}
                                        onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                                    >
                                        {
                                            tipoMascota.map(e => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Sexo
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedSexo}
                                        onChange={(e) => setSexoSeleccionado(e.target.value)}
                                    >
                                        {
                                            sexo.map(e => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Tamaño
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedTamano}
                                        onChange={(e) => setTamanoSeleccionado(e.target.value)}
                                    >
                                        {
                                            tamano.map(e => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </div>

                            </div>

                            <div className="d-flex flex-column gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Guardar Mascota
                                </button>

                                <Link to="/mascotas" className="btn btn-outline-secondary">
                                        Volver al listado
                                </Link>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    </div>
)
}

export default MascotasForm;