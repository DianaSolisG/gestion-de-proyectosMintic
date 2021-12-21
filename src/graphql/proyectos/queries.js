import { gql } from '@apollo/client';

const PROYECTOS = gql `
query Proyectos {
    Proyectos {
        nombre
        estado
        objetivos {
            descripcion
            tipo
        }
    }
}

`

export {PROYECTOS};