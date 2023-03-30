const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const UserRoute = require('./Routes/UserRoute')
const bodyParser = require('body-parser')


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

// getting-started.js
const mongoose = require('mongoose');



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}







// userRoute

app.use('/user', UserRoute)



app.get('/', async(req, res) => {
    res.send('Devhive server is running');
})

app.listen(port, () =>{
    console.log(`Devhive is running: ${port}`)
})