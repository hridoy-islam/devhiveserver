const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const UserRoute = require("./Routes/UserRoute");
const ServicesRoute = require("./Routes/ServicesRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const bodyParser = require("body-parser");
const { swaggerServe, swaggerSetup } = require("./Swagger-code/specs.js");
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// getting-started.js

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use("/user", UserRoute);
app.use("/service", ServicesRoute);
app.use("/category", CategoryRoute);
app.use("/", swaggerServe, swaggerSetup);
app.use("/api-docs", swaggerServe, swaggerSetup);

app.listen(port, () => {
  console.log(`Devhive is running: ${port}`);
});
