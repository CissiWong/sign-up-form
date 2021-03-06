import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import uuid from "uuid/v4"
import bcrypt from "bcrypt-nodejs"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/signup-form-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.
const Input = mongoose.model("Input", {
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  // bcrypt.compareSync("supersecretpassword", hash) // true
  // bcrypt.compareSync("incorrectpassword", hash) // false

  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

app.get("/users", (req, res) => {
  Input.find().then(allUsers => {
    res.json(allUsers)
  })
})

app.post("/users", (req, res) => {
  const { password } = req.body
  const hash = bcrypt.hashSync(password)
  const user = new Input({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })

  user.save().then(() => {
    res.status(201).json({ message: "Added information" })
  }).catch(err => {
    res.status(400).json({ message: "No!", errors: err.errors })
  })
})

app.post("/login", (req, res) => {
  Input.findOne({ username: req.body.username }).then(user => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({
        message: "Success!",
        accessToken: user.token,
        userId: user.id
      })
    } else {
      res.status(401).json({ message: "Authentication failure" })
    }
  })
})

const findUser = (req, res, next) => {
  Input.findById(req.params.id).then(user => {
    if (user.accessToken === req.headers.token) {
      req.user = user
      next()
    } else {
      res.status(401).send("Unauthorized")
    }
  })
}

// Add more endpoints here!

app.use("/users/:id", findUser)

app.listen(8080, () => console.log("Products API listening on port 8080!"))
