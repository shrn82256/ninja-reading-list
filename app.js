const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to database.");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Now listening for requests on port ${process.env.PORT || 5000}.`
  );
});
