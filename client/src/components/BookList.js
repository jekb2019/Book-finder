import React from 'react';
import { useQuery } from "@apollo/client";
import { getBooks } from '../queries/queries';

// useQuery를 이용해서 Query와 Component를 binding해주기
// 컴포넌트에서 Query에 결과값에 접근할 수 있도록
const BookList = (props) => {
    // 처음 랜더링이 되었을때는 로딩중이었다가 로딩이 완료되면 다시 렌더링 된다
    const {loading, error, data} = useQuery(getBooks);

    if(loading) return <p> Loading Books... </p>;
    if(error) return <p> Error loading books...</p>;
    const books = data.books;
    return(
        <div>
            <ul id="book-list">
                {books.map((book) => {
                    const { id, name } = book;
                    return <li key={id}>{name}</li>
                })}
            </ul>
        </div>
    )
}

export default BookList;