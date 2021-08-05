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

const getBook = gql`
    query($id: ID){
        book(id:$id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export { getAuthors, getBooks, addBook, getBook }