// All GraphQL Queries are defined here
import { gql } from "@apollo/client";

const getAuthors = gql`
    {
        authors {
            name
            id
        }
    }
`

const getBooks = gql`
    {
        books {
            name
            id
        }
    }
`

export { getAuthors, getBooks }