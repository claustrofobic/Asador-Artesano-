import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { getPlato, setPlato as crearPlato, updatePlato, getCategorias, getAlergenos } from "../services/api";

function FormularioPlato() {
    //trae el modal
    const [modal, setModal] = useState(null);

    // obtener el id de la url para saber si es edicion o creación
    const { id } = useParams();
    const esEdicion = !!id;

    // estado para el plato, inicialmente vacío, si es edición se carga con los datos del plato a editar
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen_url: "",
        categoria_id: "",
        disponible: 1,
        alergenos: []
    });

    // estado para la imagen
    const [imagenFile, setImagenFile] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    // estado para las categorias
    const [categorias, setCategorias] = useState([]);
    //estado para los alergenos
    const [alergenos, setAlergenos] = useState([]);

    //al cargar el componente hacemos la petición para obtener las categorias y los alergenos
    useEffect(() => {
        getCategorias().then(data => setCategorias(data));
        getAlergenos().then(data => setAlergenos(data));

        // si es edicion carga los datos de ese plato
        if (esEdicion) {
            getPlato(id).then(data => {
                setPlato(data);
                if (data.imagen_url) {
                    setImagenPreview(`${import.meta.env.VITE_API_URL}/storage/${data.imagen_url}`);
                }
            });
        }
    }, [id]);

    //funcion para manejar los cambios en el formulario
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                setImagenFile(file);
                setImagenPreview(URL.createObjectURL(file));
            }
        } else if (type === "checkbox") {
            setPlato(prev => ({ ...prev, [name]: checked ? 1 : 0 }));
        } else {
            setPlato(prev => ({ ...prev, [name]: value }));
        }
    };

    //funcion q manda los datos del nuevo plato y así guardarlo
    const guardarPlato = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", plato.nombre);
        formData.append("descripcion", plato.descripcion);
        formData.append("precio", plato.precio);
        formData.append("categoria_id", plato.categoria_id);
        formData.append("disponible", plato.disponible);

        if (imagenFile) {
            formData.append("imagen", imagenFile);
        }

        try {
            //si es edición en vez de como post se manda como put
            if (esEdicion) {
                formData.append("_method", "PUT");
                await updatePlato(id, formData);
            } else {
                //sino, pues se crea
                await crearPlato(formData);
            }
            //ventana modal
            setModal(esEdicion ? "Plato actualizado correctamente." : "Plato creado correctamente.");
        } catch (error) {
            setModal("Ha ocurrido un error. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            {modal && <Modal mensaje={modal} onCerrar={() => setModal(null)} />}
            <div className="formulario-admin-container">
                <h1>{esEdicion ? "Editar Plato" : "Nuevo Plato"}</h1>
                <form className="formulario-admin" onSubmit={guardarPlato}>

                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={plato.nombre} onChange={handleChange} />

                    <label>Categoría:</label>
                    <select name="categoria_id" value={plato.categoria_id} onChange={handleChange}>
                        <option value="">Selecciona una categoría</option>
                        {[...categorias]
                            .sort((a, b) => a.nombre.localeCompare(b.nombre))
                            .map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))
                        }
                    </select>

                    <label>Alergenos:</label>
                    <div className="alergenos-checkboxes">
                        {alergenos.map(al => (
                            <label key={al.id}>
                                <input type="checkbox" name="alergenos" value={al.id} onChange={handleChange} />
                                {al.nombre}
                            </label>
                        ))}
                    </div>

                    <label>Descripción:</label>
                    <textarea name="descripcion" value={plato.descripcion} onChange={handleChange} />

                    <label>Precio:</label>
                    <input type="number" name="precio" value={plato.precio} onChange={handleChange} />

                    <label>Imagen:</label>
                    <input type="file" name="imagen" accept="image/*" onChange={handleChange} />

                    {imagenPreview && (
                        <img
                            src={imagenPreview}
                            alt="Preview"
                            style={{ width: "150px", marginTop: "8px", borderRadius: "6px" }}
                        />
                    )}

                    <label>Disponible:</label>
                    <input type="checkbox" name="disponible" checked={!!plato.disponible} onChange={handleChange} />

                    <button type="submit" className="btn-guardar">Guardar</button>
                </form>
            </div>
        </>
    );
}

export default FormularioPlato;