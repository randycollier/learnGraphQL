const express = require('express');

const models = require('./models');
const expressGraphQL = require("express-graphql");
const os = require('os');
const schema = require('./schema/schema');
const app = express();
const PORT = 3030;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://randy:myDatabas3!!@ds125058.mlab.com:25058/randemo_db';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(express.static('dist'));
app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));


app.get('/api/getUsername', (req, res) => res.json({ username: os.userInfo().username }));
app.get('/*',  (req, res) =>{
    res.render('index',{PORT, PORT});
  });
app.listen(PORT, () => console.log(`Listening on port localhost:${PORT}!`));





