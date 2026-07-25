
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import MascotasForm from "./MascotasForm";


function MascotasList({ lista, onAdd, onDelete, onUpdate }) {

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



    return (
        <>
            <h2>Lista mascotas</h2>

            <MascotasForm onAdd={onAdd} />

            {
                lista.map(m =>
                (
                    <div key={m.id}>
                        <h3>{m.nombre}</h3>
                        <img src={m.imagen} />
                        <p>{m.descripcion}</p>
                        <p>Edad: {m.edad}</p>
                        <p>Raza: {m.raza}</p>
                        <p>Estado: {m.estado}</p>

                        <select
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

                        <Link to={`${m.id}`}>Ver mascota</Link>
                        
                        <button onClick={() => onDelete(m.id)}>Eliminar</button>

                        <button onClick={() => onUpdate(m.id,selectedEstados[m.id] ?? m.estado)}>
                            Actualizar Estado
                        </button>
                    </div>
                )
                )

            }
           
        </>
    )
}

export default MascotasList;