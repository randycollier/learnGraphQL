const express = require('express');
const expressGraphQL = require("express-graphql");
const os = require('os');
const schema = require('./schema/schema');
const app = express();
const PORT = 8080

app.use(express.static('dist'));

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));


app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(PORT, () => console.log(`Listening on port localhost:${PORT}!`));
