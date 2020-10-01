const express = require('express');
const { getUserPosts } = require('./userDb.js');

const Users = require("./userDb.js");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding the user"
      })
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id;
  req.body.user_id = id;
  //eventually just:
  //req.body.user_id = req.params.id
  Posts.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error adding post"
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error retrieving the users"
      })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then( user => {
      user ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({ message: "Posts not found" })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "the user been erased from history"})
      } else {
        res.status(404).json({message: "the user couldn't be found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error removing user"
      })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
