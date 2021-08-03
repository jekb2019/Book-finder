const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// graphql의 endpoint
// /graphql로 요청이 올경우 graphqlHTTP가 미들웨어 역할을 한다
app.use('/graphql', graphqlHTTP({
    //우리의 Schema가 들어간다 (represents how our graph looks)
    schema,
    graphiql: true // we want to use graphiql UI tool when we visit this address 

}))


app.listen(8080, () => console.log('Server Running...'));