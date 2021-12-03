import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const IndexUsuarios = () => {
    const {data,error,loading} = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log('data servidor', data);
    }, [data]);

    useEffect(()=>{
        if(error)
        {
            toast.error('Error consultando los usuarios');
        }
    },[error])

    if (loading) return <div>Cargando....</div>

    return (
    <div>
        Datos Usuarios:
        <table className='tabla'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Identificacion</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.Usuarios.map((u)=> {
                        return (
                            <tr key={u._id}>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.correo}</td>
                                <td>{u.identificacion}</td>
                                <td>{u.rol}</td>
                                <td>{u.estado}</td>
                                <td>
                                    <Link to={`/usuarios/editar/${u._id}`}>
                                        <i className = 'fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer'/>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>

        </table>
    </div>)
};

export default IndexUsuarios