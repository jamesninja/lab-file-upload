const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');

/* GET home page */
//router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/', (req, res, next) => {
  Post.find({}).populate('creatorId').then(postsFromDB => {
    res.render('index', {
      posts: postsFromDB
    });
  }).catch(err => next(err));
});

module.exports = router;