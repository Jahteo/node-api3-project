const express = require('express');
const usersRouter = require('./users/userRouter')

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//endpoints
server.use("/api/users", usersRouter);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
