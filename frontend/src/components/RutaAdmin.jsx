import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function RutaAdmin({ children }) {
    const { token, usuario } = useAuth();
    //si no hay es admin o no hay rol, redirige al login
    if (!token ||!usuario?.rol || usuario?.rol !== 'admin') {
        return <Navigate to="/login" />;
    }

    return children;
}

export default RutaAdmin