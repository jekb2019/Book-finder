const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLList} = graphql;

// Dummy Data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'Harry Potter', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'I pooped on your face', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'My little butt', genre: 'Sci-Fi', id: '6', authorId: '3'},
]

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
]

// Define Book Type
const BookType = new GraphQLObjectType({
    name: 'Book', // Object의 이름
    // Object가 가지는 Fields
    fields: () => ({ // Object를 리턴하는 함수이다
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       author: {
           type: AuthorType,
           // 여기서 parent는 book을 의미한다
           // 만약 book id가 2였다면 parent는 다음과 같다:
           // { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' }
           resolve(parent, args) {
               return _.find(authors, {id: parent.authorId})
           }
       }
    })
})

// Define Author Type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

// 우리의 Root Queries들을 정의해준다
// Root Queries들은 Entry points들에 접근했을떄 어떻게 할것인지 의미한다
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // fields에는 entry points들이 들어있다.
    // 콜백이 아니라 오브젝트이다!
    fields: { 
        book: {
            type: BookType, // 결과 값은 BookType
            args: { id: { type: GraphQLID }}, // Query에 넣어줘야하는 arguments들을 정의,
            // 우리가 데이터를 가져오기 위해 사용하는 함수
            resolve(parent, args) {
                return _.find(books, {id: args.id}); // id에 해당하는 book을 찾아서 반환 
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
})



// 사용 가능한 Query들을 export해주자
module.exports = new GraphQLSchema({
    query: RootQuery
})
