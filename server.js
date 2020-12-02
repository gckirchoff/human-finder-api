const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
  }
  }
});

app.use(express.json());
app.use(cors());



app.get('/', (req, res)=> { res.send("It worked") })
app.post('/signin', signin.handleSignin(db, bcrypt))   //compares entered password with hash then sets route to home
app.post('/register', (req, res) => { register.handleRegister(req, res, db ,bcrypt) })   //hashes password and registers new user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })  //Gets profile
app.put('/image', (req, res) => { image.handleImagePut(req, res, db) })  //Entries per image upload
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`)
})


/*
What we want is a res that says this is working

/signin that will be a POST request that responds with success or fail

/register that will be a POST request that will be the new user

/progile/ access in homescreen with a userid that is a GET request that returns this user information

/image that will be a put that updates the user object

*/