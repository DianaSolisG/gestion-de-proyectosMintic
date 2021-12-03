import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';

const EditarUsuario = () => {

    const {form, formData, updateFormData } = useFormData(null);

    const { _id } = useParams();

    const {data,error,loading} = useQuery(GET_USUARIO,{
        variables:{_id},
    });

    if (loading) return <div>Cargando.....</div>;

    const submitForm = (e)=>{
        e.preventDefault();
        console.log('fd', formData)
    }

    console.log(data)
    return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link>
            <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900'/>
        </Link>
        <hi className='m-4 text-3x1 text-gray-800 font-bold text-center'>Editar Usuario</hi>
        <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
        >
            <Input
            label='Nombre de la persona:'
            type= 'text'
            nome= 'nombre'
            defaulValue={data.Usuario.nombre}
            required={true}
            />
            <Input
            label='Apellido de la persona:'
            type= 'text'
            nome= 'apellido'
            defaulValue={data.Usuario.apellido}
            required={true}
            />
            <Input
            label='Correo de la persona:'
            type= 'email'
            nome= 'correo'
            defaulValue={data.Usuario.correo}
            required={true}
            />
            <Input
            label='Identificación de la persona:'
            type= 'text'
            nome= 'identificacion'
            defaulValue={data.Usuario.identificacion}
            required={true}
            />
            {/* <DropDown
            label='Rol de la persona:'
            nome= 'rol'
            defaulValue={userData.rol}
            required={true}
            options={Enum_Rol}
            /> */}
            <ButtonLoading
            disabled={false}
            loading = {false}
            text='Confirmar'
            />
        </form>

    </div>)
}

export default EditarUsuario;
