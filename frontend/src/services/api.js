// URL base de la API de Laravel
const API_URL = 'http://localhost:8000/api';

// función para hacer las peticiones a la API
//endpoint-> la del url después de /api
const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    // se va a mandar un json
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // si hay token lo añadimos
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    //se manda el url + endpoint con sus opciones y sus headers (con token, o null)
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: headers,
        ...options,
    });

    return response.json();
};

// petición GET a /api/platos
export const getPlatos = () => request('/platos');

// petición POST a /api/login
export const login = (email, password) => request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
});

// petición POST a /api/registro
export const register = (datos) => request('/registro', {
    method: 'POST',
    body: JSON.stringify(datos),
});

// petición GET a /api/mis-pedidos
export const getMisPedidos = () => request('/mis-pedidos');

// petición POST a /api/mis-pedidos
export const setPedido = (plato_id) => request('/mis-pedidos', {
    method:'POST',
    body: JSON.stringify({plato_id}),
});