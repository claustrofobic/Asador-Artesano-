import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAlergenos, setAlergeno, updateAlergeno } from "../services/api";

function FormularioAlergenos() {

    const { id } = useParams();
    const esEdicion = !!id;

    const [alergeno, setAlergeno] = useState({
        nombre: "",
    });

    useEffect(() => {
        if (esEdicion) {
            getAlergenos(id).then(data => setAlergeno(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlergeno(prev => ({ ...prev, [name]: value }));
    };

    const guardarAlergeno = (e) => {
        e.preventDefault();
        if (esEdicion) {
            updateAlergeno(id, alergeno);
        } else {
            setAlergeno(alergeno);
        }
    };

    return (
        <div className="formulario-admin-container">
            <h1>{esEdicion ? "Editar Alérgeno" : "Nuevo Alérgeno"}</h1>
            <form className="formulario-admin" onSubmit={guardarAlergeno}>

                <label>Nombre:</label>
                <input type="text" name="nombre" value={alergeno.nombre} onChange={handleChange} />

                <button type="submit" className="btn-guardar">Guardar</button>
            </form>
        </div>
    );
}

export default FormularioAlergenos;