const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv").config();

const csvRouter = require("./routes/csvFileRoute")



const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection succesful"))
  .catch((err) => console.log(err));



app.use('/api', csvRouter );

const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
