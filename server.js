const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3456;

const mongo_URI = 'mongodb+srv://khushwantkodecha:khushwantkodecha@mernsignupandsignin-cyktb.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongo_URI || "mongodb://localhost/mern_signup_login", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("MONGOOSE CONNECTED!!!");
});

app.get("/", (req, res) =>{
  res.send("hello!");
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended   : true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
