/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ auth: false, token: null, usuario: null });
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const { data } = await clienteAxios.get('/usuarios/perfil', config);
                setAuth({
                    auth: true,
                    token,
                    usuario: data.usuario
                });
                setCargando(false);
            } catch (error) {
                console.log(error);
                setCargando(false);
            }
        };
        cargarUsuario();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return navigate('/');
        }
        

    }, []);

    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            cargando, setCargando
        }}>
            {children}
        </AuthContext.Provider>

    );

};

export { AuthContext };

export default AuthProvider;