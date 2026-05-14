import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // cargamos el usuario desde localStorage al iniciar la aplicación
    const [usuario, setUsuario] = useState(() => {
        try {
            const stored = localStorage.getItem('usuario'); 
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // función para iniciar sesión, guarda token y usuario en localStorage y estado
    const iniciarSesion = (nuevoToken, nuevoUsuario) => {
        localStorage.setItem('token', nuevoToken);
        localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
        setToken(nuevoToken);
        setUsuario(nuevoUsuario);
    };

    // función para cerrar sesión, elimina token y usuario de localStorage y estado
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ token, usuario, iniciarSesion, cerrarSesion, cargando: false }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);