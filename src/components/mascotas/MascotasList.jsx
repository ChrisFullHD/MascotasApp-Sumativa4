
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import MascotasForm from "./MascotasForm";


function MascotasList({ lista, onAdd, onDelete, onUpdate, errores }) {

    const [estados, setEstados] = useState([]);
    const [selectedEstados, setSelectedEstados] = useState({});

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            setEstados(response.data.estado);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChoices();
    }, []);

    const handleEstadoChange = (id, estado) => {
        setSelectedEstados((prev) => ({
            ...prev,
            [id]: estado
        }));
    };

    const obtenerLabelEstado = (valorEstado) => {
        const estado = estados.find((e) => e.value === valorEstado);
        return estado ? estado.label : valorEstado;
    };

    const obtenerColorEstado = (estado) => {
        switch (estado) {
            case "adoptada":
                return "success";

            case "en_adopcion":
                return "primary";

            case "encontrada":
                return "success";

            case "perdida":
                return "danger";

            default:
                return "secondary";
        }
    };



    return (
        <div className="container my-4">

            <h2 className="text-center mb-4">
                Lista mascotas
            </h2>

            {/*<MascotasForm onAdd={onAdd} errores={errores} /> */}

            <div className="row g-4">

            {
                lista.map(m =>
                (
                    <div key={m.id} className="col-md-6 col-lg-4">

                        <div className="card h-100 shadow">
                            
                        <h3 className="card-title text-center mb-3 mt-3">{m.nombre}</h3>
                        <img src={m.imagen} className="card-img-top" alt={m.nombre} style={{ height: "250px", objectFit: "scale-down" }}/>
                        <div className="card-body">
                        <p className="text-center">{m.descripcion}</p>
                        <p>Edad: {m.edad}</p>
                        <p>Raza: {m.raza}</p>
                        <p>Estado: 
                            <span className={`badge bg-${obtenerColorEstado(m.estado)} ms-2`}>
                            {obtenerLabelEstado(m.estado)}
                            </span>
                        </p>

                        <select className="form-select mb-3"
                            value={selectedEstados[m.id]?? m.estado}
                            onChange={(e) => handleEstadoChange(m.id, e.target.value)}>
                                
                                {
                                    estados.map((estado)=> (
                                        <option key={estado.value} value={estado.value}>
                                            {estado.label}
                                        </option>
                                    ))
                                }

                            </select>

                        <div className="d-flex gap-2 mt-3">

                            <Link to={`${m.id}`} className="btn btn-primary flex-fill" >Detalles</Link>
                            
                            <button className="btn btn-danger flex-fill" onClick={() => onDelete(m.id)}>Eliminar</button>

                        </div>

                        <div className="d-grid mt-3">
                            <button className="btn btn-success btn-sm" onClick={() => onUpdate(m.id,selectedEstados[m.id] ?? m.estado)}>
                                Actualizar Estado
                            </button>
                        </div>

                        </div>
                    </div>
                    </div>
                )
                )

            }

            </div>
           
        </div>
    )
}

export default MascotasList;