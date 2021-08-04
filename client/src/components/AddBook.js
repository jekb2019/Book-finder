import React from 'react'
import { useQuery } from "@apollo/client";
import { getAuthors } from '../queries/queries';

function AddBook() {
    const {loading, error, data} = useQuery(getAuthors);

    const displayAuthors = () => {
        if(loading) return <option> Loading Authors... </option>;
        if(error) return <option> Error loading authors...</option>;
        if(data) {
            const authors = data.authors;
            return authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    return (
        <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author</label>
                <select>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook
