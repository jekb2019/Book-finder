import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { getAuthors, addBook, getBooks } from '../queries/queries';

function AddBook() {
    const {loading: getAuthorLoading, error: getAuthorError, data: getAuthorData} = useQuery(getAuthors);
    const [addBookMutateFunction, { data: addBookData, loading: addBookLoading, error: addBookError }] = useMutation(addBook);

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAutherId] = useState("");

    const displayAuthors = () => {
        if(getAuthorLoading) return <option> Loading Authors... </option>;
        if(getAuthorError) return <option> Error loading authors...</option>;
        if(getAuthorData) {
            const authors = getAuthorData.authors;
            return authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        console.log(name, genre, authorId);;
        a
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input onChange={(e) => setName(e.target.value)} type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input onChange={(e) => setGenre(e.target.value)} type="text"/>
            </div>
            <div className="field">
                <label>Author</label>
                <select onChange={(e) => setAutherId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook
