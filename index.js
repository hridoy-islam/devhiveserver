const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const UserRoute = require('./Routes/UserRoute')
const ServicesRoute = require('./Routes/ServicesRoute')
const bodyParser = require('body-parser')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

// getting-started.js

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);


// userRoute

app.use('/user', UserRoute);
app.use('/service', ServicesRoute)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


app.get('/', async(req, res) => {
    res.send('Devhive server is running');
})

app.listen(port, () =>{
    console.log(`Devhive is running: ${port}`)
})