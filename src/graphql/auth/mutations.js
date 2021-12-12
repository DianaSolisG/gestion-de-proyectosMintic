import { gql } from '@apollo/client'

const REGISTRO = gql `
    mutation Registro(
        $nombre: String!,
        $apellido: String!,
        $identificacion: String!,
        $correo: String!,
        $password: String!,
        $rol: Enum_Rol!,
        ) {
            registro(
                nombre: $nombre,
                apellido: $apellido,
                identificacion: $identificacion,
                correo: $correo,
                password: $password,
                rol: $rol,
            ){
                token
                error
            }
        }


`;

const LOGIN = gql `
mutation Login(
    $correo: String!,
    $password: String!
    ){
        login(
            correo: $correo,
            password: $password
        ) {
            token
            error
  }
}
`

const VALIDATE_TOKEN = gql `
mutation ValidateToken {
  validateToken {
    token
    error
  }
}

`

export { REGISTRO, LOGIN, VALIDATE_TOKEN };