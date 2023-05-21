require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();
const {readdirSync} = require('fs')
// const path = require('path')

app.use(express.json());
app.use(cors())
app.use(fileUpload({useTempFiles:true}))
app.use(express.static(__dirname + '/public'));
mongoose.set('strictQuery', true);
// console.log("htmlDir --", path.join(__dirname, `/email.html`))
readdirSync('./routes').map(r => app.use('/' , require("./routes/"+r)));
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})
const db = process.env.DB_URL
const PORT = process.env.PORT || 8080
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const connect = async () => {
  try {
    await mongoose.connect(db, config)
  } catch (err) {
    throw err
  }
}
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected", () => {
  console.log("Connnected to database")
})
//Server
app.listen(PORT, () => {
  connect()
  console.log(`server is listening on port ${PORT}`)
})

