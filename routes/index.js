const { asyncErrorHandler }                                                                = require('../middleware/index.js');
const {	Index , Register , about , gallery , contact , services, initiatives , topSelling , updateTopSelling , deleteTopSelling }                 = require('../controllers/index.js');

const express = require('express');
const router = express.Router({mergeParams:true}),
      passport = require("passport"),
      Post = require("../models/posts.js"),
      TopSelling = require("../models/topSelling.js"),
      User = require("../models/users.js");
      express().use(express.static('/public'))
/* GET home page. */

router.get('/', asyncErrorHandler(Index));

router.post('/top-selling/:id', asyncErrorHandler(topSelling));

router.put('/top-selling', asyncErrorHandler(updateTopSelling));

router.delete('/top-selling', asyncErrorHandler(deleteTopSelling));

router.get('/cron', (req,res)=>{
  res.status("200");
  res.json({ "job running": true })
});

router.get('/about-us', asyncErrorHandler(about));

router.get('/gallery', asyncErrorHandler(gallery));

router.get('/contact-us', asyncErrorHandler(contact));

router.get('/services', asyncErrorHandler(services));

router.get('/initiatives', asyncErrorHandler(initiatives));


// *=================================//
// *        Register Route           //
// *=================================//
router.get("/register", (req, res) => {
  res.render("auth/register", {page_name : "register"})
});

router.post("/register", asyncErrorHandler(Register));


// *=================================//
// *           Login Route           //
// *=================================//
router.get("/login", (req, res) => { 
  res.render("auth/login" , {message: req.flash("error") , page_name : "login"})
});

router.post("/login",
  passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"back",
    failureFlash:true
  }),(req,res)=>{
  });
// *=================================//
// *           Logout Route          //
// *=================================//

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/blog");
});



module.exports = router;