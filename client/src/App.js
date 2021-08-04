import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from './components/AddBook';

//apollo client setup
const client = new ApolloClient({
  // the end point we want to send request to
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    // ApolloProvider tag binds our React App with Apollo
    // It injects the data reveiced from the server to our App component
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Jason's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;