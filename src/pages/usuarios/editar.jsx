import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import { toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';

const EditarUsuario = () => {

    const {form, formData, updateFormData } = useFormData(null);

    const { _id } = useParams();

    const {
        data:queryData,
        error:queryError,
        loading:queryLoading
    } = useQuery(GET_USUARIO,{
        variables:{_id},
    });

    const [editarUsuario, {
        data:mutationData,
        loading:mutationLoading,
        error:mutationError
    }] = useMutation(EDITAR_USUARIO);

    const submitForm = (e)=>{
        e.preventDefault();
        delete formData.rol;
        editarUsuario({
            variables:{_id, ...formData}
        })
    }

    useEffect(() => {
        if (mutationData){
            toast.success('Usuario modificado con exito')
        }
    }, [mutationData])

    useEffect(()=>{
        if(mutationError){
            toast.error('Error modificando el usuario');
        }
        if(queryError){
            toast.error('Error consultando el usuario')
        }
    },[queryError, mutationError])

    if (queryLoading) return <div>Cargando.....</div>;


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
            defaulValue={queryData.Usuario.nombre}
            required={true}
            />
            <Input
            label='Apellido de la persona:'
            type= 'text'
            nome= 'apellido'
            defaulValue={queryData.Usuario.apellido}
            required={true}
            />
            <Input
            label='Correo de la persona:'
            type= 'email'
            nome= 'correo'
            defaulValue={queryData.Usuario.correo}
            required={true}
            />
            <Input
            label='Identificación de la persona:'
            type= 'text'
            nome= 'identificacion'
            defaulValue={queryData.Usuario.identificacion}
            required={true}
            />
            <DropDown
            label='Estado de la persona:'
            nome= 'estado'
            defaulValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoUsuario}
            />
            <span>Rol del Usuario: {queryData.Usuario.rol}</span>
            <ButtonLoading
            disabled={Object.keys(formData).length===0}
            loading = {mutationLoading}
            text='Confirmar'
            />
        </form>

    </div>)
}

export default EditarUsuario;
