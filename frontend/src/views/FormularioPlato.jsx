import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlato, setPlato as crearPlato, updatePlato, getCategorias } from "../services/api";

function FormularioPlato() {

    const { id } = useParams();
    const esEdicion = !!id;

    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen_url: null,
        categoria_id: "",
        disponible: 1,
    });

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        getCategorias().then(data => setCategorias(data));

        if (esEdicion) {
            getPlato(id).then(data => setPlato(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setPlato(prev => ({ ...prev, imagen_url: URL.createObjectURL(files[0]) }));
        } else if (type === "checkbox") {
            setPlato(prev => ({ ...prev, [name]: checked ? 1 : 0 }));
        } else {
            setPlato(prev => ({ ...prev, [name]: value }));
        }
    };

    const guardarPlato = (e) => {
        e.preventDefault();
        if (esEdicion) {
            updatePlato(id, plato);
        } else {
            crearPlato(plato);
        }
    };

    return (
        <div className="formulario-admin-container">
            <h1>{esEdicion ? "Editar Plato" : "Nuevo Plato"}</h1>
            <form className="formulario-admin" onSubmit={guardarPlato}>

                <label>Nombre:</label>
                <input type="text" name="nombre" value={plato.nombre} onChange={handleChange} />

                <label>Categoría:</label>
                <select name="categoria_id" value={plato.categoria_id} onChange={handleChange}>
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                </select>

                <label>Descripción:</label>
                <textarea name="descripcion" value={plato.descripcion} onChange={handleChange} />

                <label>Precio:</label>
                <input type="number" name="precio" value={plato.precio} onChange={handleChange} />

                <label>Imagen:</label>
                <input type="file" name="imagen" onChange={handleChange} />

                <label>Disponible:</label>
                <input type="checkbox" name="disponible" checked={!!plato.disponible} onChange={handleChange} />

                <button type="submit" className="btn-guardar">Guardar</button>
            </form>
        </div>
    );
}

export default FormularioPlato;