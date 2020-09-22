const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const fileUploader = require('../configs/cloudinary.config');
// const {
//   findOne,
//   find
// } = require('../models/Post.model');

const routeGuard = require('../configs/route-guard.config');

// route d'affichage du formulaire pour poster un post
router.get('/new-post/', routeGuard, (req, res, next) => {
  res.render('posts/post-form', {
    userInSession: req.session.currentUser,
    userId: req.params.id
  });
});

router.post('/new-post/', fileUploader.single('image'), (req, res, next) => {
  console.log(req.sesssion.currentUser);
  // findOne({
  //   username: userInSession.username
  // }).then(currentUser => {
  //   const userId = currentUser.id
  //   console.log(userId)
  // }).catch(err => next(err));
  Post.create({
      content: req.body.content,
      creatorId: req.session.currentUser, // quelle valeur doit-on récupérer pour l'ID de l'utilisateur si on veut le récupérer directement dans la session et non en params
      picPath: req.file.path,
      picName: req.file.originalname
    })
    .then(post => {
      console.log('Post created !', post);
      res.redirect('/');
    })
    .catch(err => next(err));
});

router.get('/post/:id', (req, res, next) => {
  Post.findOne({
      id: req.params.id
    })
    .populate('creatorId')
    .then(post => {
      console.log(post);
      res.render('posts/post-detail', {
        post: post
      });
    })
    .catch(err => next(err));
});

module.exports = router;