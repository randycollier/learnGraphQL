const express = require('express');
const expressGraphQL = require("express-graphql");
const os = require('os');
const schema = require('./schema/schema');
const app = express();
const PORT = 3030;

app.use(express.static('dist'));
app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));


app.get('/api/getUsername', (req, res) => res.json({ username: os.userInfo().username }));
app.get('/*',  (req, res) =>{
    res.render('index',{PORT, PORT});
  });
app.listen(PORT, () => console.log(`Listening on port localhost:${PORT}!`));
