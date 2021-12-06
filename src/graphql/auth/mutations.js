import { gql } from '@apollo/client'

const REGISTRO = gql `
    mutation Registro(
        $nombre: String!,
        $apellido: String!,
        $identificacion: String!,
        $correo: String!,
        $password: String!
        ) {
            registro(
                nombre: $nombre,
                apellido: $apellido,
                identificacion: $identificacion,
                correo: $correo,
                password: $password
            )
        }


`;

export { REGISTRO };