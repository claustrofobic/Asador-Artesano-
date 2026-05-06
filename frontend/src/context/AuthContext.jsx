import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));

    const iniciarSesion = (nuevoToken, nuevoUsuario) => {
        localStorage.setItem('token', nuevoToken);
        localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
        setToken(nuevoToken);
        setUsuario(nuevoUsuario);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ token, usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);