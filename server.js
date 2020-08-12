const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');

const saltRounds = 10;

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
	res.json('LogedIn');
})

app.get('/', (req, res) => {res.send('Working')});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) } );
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) } );
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) } );
app.put('/image', (req, res) => { image.handleImage(req, res, db) } );
app.post('/imageurl', (req, res) => { image.handleApi(req, res) } );

app.listen(process.env.PORT || 3000, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});