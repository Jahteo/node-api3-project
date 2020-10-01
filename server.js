const express = require('express');
const usersRouter = require('./users/userRouter')

const server = express();
server.use(express.json());

server.use(logger);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//endpoints
server.use("/api/users", usersRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    "logger:", new Date().toISOString(), req.method, req.url
  );
  next();
}

module.exports = server;
