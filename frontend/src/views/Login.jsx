import {useState} from 'react';
//importa el useState para variables q cambian
import { useNavigate } from 'react-router-dom';
// el router para navegar sobre páginas
import { login } from '../services/api';
// y el método del login q conecta con la api para llevar la lógica (backend)
import { useAuth } from '../context/AuthContext';
// y el useAuth para guardar el token del login en el contexto
import '../assets/css/auth.css'; 


function Login() {
    //guarda las variables para el email y la contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //variable para mostrar los errores
    const [error, setError] = useState("");
    const navigate = useNavigate();
    //variable para iniciar sesión y guardarlo con el contexto
    const {iniciarSesion} = useAuth();

    const iniciarSesionSubmit = async (e) => {
        // evita que el formulario recargue la página
        e.preventDefault();
        
        // llama a la API con email y contraseña
        const respuesta = await login(email, password);

        if (respuesta.token) {
            // guarda el token en el navegador
            iniciarSesion(respuesta.token, respuesta.usuario);
            // redirige a la carta
            navigate('/carta');
        } else {
            // muestra el error si las credenciales son incorrectas
            setError(respuesta.message);
        }
    };

    return (
        //formulario del login
        <div className="auth-container">
    <h1>Login</h1>
    {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={iniciarSesionSubmit}>
    <label>Email
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required/> 
    </label>
        <label>Contraseña
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/> 
        </label>
        <button type="submit">Entrar</button>
    </form>
    <button id="btn-registro" type="button" onClick={() => navigate('/registro')}>¿No tienes cuenta? Regístrate</button> 
        </div>

    )
}

export default Login