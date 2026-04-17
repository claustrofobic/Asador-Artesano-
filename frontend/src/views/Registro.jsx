import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { register } from '../services/api';
import {useAuth} from '../context/AuthContext';

function Registro() {
    //variables para los campos
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPaswordConf] = useState("");
    //variable para mostrar errores
    const [error, setError] = useState("");
    //navigate para poder redirigir
    const navigate = useNavigate();
    //método iniciar sesión
    const {iniciarSesion} = useAuth();
    //evento de registrarse
    const registrarseSubmit = async (e) => {
        //evita que el formulario se recargue
        e.preventDefault();
        //llama a la API
        const respuesta = await register({nombre, email, telefono, password, password_confirmation});
        if (respuesta.token){
            iniciarSesion(respuesta.token);
            navigate('/carta');
        } else {
            setError(respuesta.message);
        }
    };
    return (
    <div>
        <h1>Registro</h1>
        {error && <p style={{color:'red'}}>{error}</p>}
            <form onSubmit={registrarseSubmit}>
                <label>Nombre
                    <input type="text" name="nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required/>
                </label>
                <label>Email
                    <input type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                </label>
                <label> Telefono
                    <input type="tel" name="telefono" value={telefono} onChange={e=>setTelefono(e.target.value)} required/>
                </label>
                <label> Contraseña
                    <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                </label>
                <label> Repita la contraseña
                    <input type="password" name="password_confirmation" value={password_confirmation} onChange={e=>setPaswordConf(e.target.value)} required/>
                </label>
                <button type="submit">Registrarme</button>
            </form>
    
    </div>)
}

export default Registro