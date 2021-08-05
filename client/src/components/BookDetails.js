import React from 'react'
import { useQuery } from "@apollo/client";
import { getBook } from '../queries/queries';

function BookDetails({bookId}) {
    const {loading, error, data} = useQuery(getBook, {
        variables: {
            id: bookId
        }
    });
    
    function displayBook() {
        if(loading) return <p> Loading Books... </p>;
        if(error) return <p> Error loading books...</p>;
        if(data) {
            const book = data.book
            if(!book) {
                return <p>No Book Selected</p>
            }
            const {name, genre, author} = book;
            const {name: authorName, books: authorBooks} = author;
            console.log(author);
            return (
            <div>
                <h2>{name}</h2>
                <p>{genre}</p>
                <p>{authorName}</p>
                <ul className="other-books">
                    {
                        authorBooks.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })   
                    }
                </ul>
            </div>
            )
        }
    }

    return (
        <div id="book-details">
            {displayBook()}
        </div>
    )
}

export default BookDetails
