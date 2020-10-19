const express = require('express');
const Post = require("../models/posts.js")

middleware = {
  asyncErrorHandler:  (fn) =>
   (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch(e => next(e));
    },
  isLoggedIn: (fn) => (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error", "Please Login First!")
      res.redirect("back")
    }
  },
  checkPostOwnership: (fn) =>
    (req, res, next) => {
      if (req.isAuthenticated()) {
        Post.findOne({ myslug: req.params.slug }, (err, post) => {
          if (err) {
            console.log(err);
            res.redirect("back")
          } else {
            if (post.author.id.equals(req.user._id)) {
              return next();
            } else {
              res.redirect("back")
            }
          }
        });
      } else {
        res.redirect("back")
      }
    }
}  
module.exports = middleware