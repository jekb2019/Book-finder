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

const addBook = gql`
    mutation ($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
        }
    }
`

export { getAuthors, getBooks, addBook }