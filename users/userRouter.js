const express = require('express');
const { getUserPosts } = require('./userDb.js');

const Users = require("./userDb.js");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  req.body.user_id = req.params.id;
  // console.log(req.user)
  // console.log(req.body)
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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
  //with validation baked in:
  // Users.getById(req.params.id)
  //   .then( user => {
  //     user ? res.status(200).json(user)
  //     : res.status(404).json({ message: "User not found" })
  //   })
});

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "the user been updated"})
    } else {
      res.status(404).json({message: "the user couldn't be updated"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "error updating user"
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then( user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "User not found (Stopped by validateUserId)" });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid user id (Stopped by validateUserId)" })
    });
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body)
  if (req.body) {
    req.body.name ? next()
    : res.status(400).json({ message: "missing required name field" })
  } else {
    //###Q: in practice I can't get hit this error, even when setting postman to no body. Why?
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.body)
  if (req.body) {
    req.body.text ? next()
    : res.status(400).json({ message: "missing required text field" })
  } else {
    //###Q: in practice I can't get hit this error, even when setting postman to no body. Why?
    res.status(400).json({ message: "missing user data" })
  }
}

module.exports = router;
