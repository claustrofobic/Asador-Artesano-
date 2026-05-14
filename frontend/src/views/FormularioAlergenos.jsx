import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { getAlergenos, setAlergeno as crearAlergeno, updateAlergeno } from "../services/api";

function FormularioAlergenos() {

    const { id } = useParams();
    const esEdicion = !!id;

    const [alergeno, setAlergenoState] = useState({ nombre: "" });
    const [modal, setModal] = useState(null);

    useEffect(() => {
        if (esEdicion) {
            getAlergenos(id).then(data => setAlergenoState(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlergenoState(prev => ({ ...prev, [name]: value }));
    };

    const guardarAlergeno = async (e) => {
        e.preventDefault();
        try {
            if (esEdicion) {
                await updateAlergeno(id, alergeno);
            } else {
                await crearAlergeno(alergeno);
            }
            setModal(esEdicion ? "Alérgeno actualizado correctamente." : "Alérgeno creado correctamente.");
        } catch (error) {
            setModal("Ha ocurrido un error. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            {modal && <Modal mensaje={modal} onCerrar={() => setModal(null)} />}
            <div className="formulario-admin-container">
                <h1>{esEdicion ? "Editar Alérgeno" : "Nuevo Alérgeno"}</h1>
                <form className="formulario-admin" onSubmit={guardarAlergeno}>

                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={alergeno.nombre} onChange={handleChange} />

                    <button type="submit" className="btn-guardar">Guardar</button>
                </form>
            </div>
        </>
    );
}

export default FormularioAlergenos;