const path = require("path");
const TopSelling = require("../models/topSelling.js");
const Post = require("../models/posts.js");
const User = require("../models/users.js");

module.exports = {

  async Index(req, res, next) {
    Post.find({}).sort({date:-1}).limit(3).exec( function (err, returnedposts) {
      if(err){
      console.log(err);
      res.send("not connected to database")
      }else{
        TopSelling.find({}).sort({date:-1}).limit(6).exec( function (err, top) {
          if(err){
          console.log(err);
          res.send("not connected to database")
          }else{
            res.render('index' , { post: returnedposts , topSelling: top,  page_name: "home" } );
          }
        });
      }
    });
  },  
  async topSelling(req, res){
    console.log(req.file);
    let obj = { 
      name: req.body.topSelling.name, 
      price: req.body.topSelling.price, 
      link: req.body.topSelling.link, 
      cartLink: req.body.topSelling.cartLink, 
      productImg:req.file.path
  } 
    TopSelling.create(obj
      , function (err, posts) {
      if (err) {
        res.send({err});
      } else {
        console.log("Data added Successfully");
        res.redirect(`/`);
      }
    });
  },
  async updateTopSelling(req, res){
    let obj = { 
      name: req.body.topSelling.name, 
      price: req.body.topSelling.price, 
      link: req.body.topSelling.link, 
      cartLink: req.body.topSelling.cartLink, 
      productImg: req.file.path
  } 
    TopSelling.findOneAndUpdate({ _id: req.params.id }, obj, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        res.redirect("/");
      }
    })
  },
  async deleteTopSelling(req, res){
    TopSelling.findOneAndDelete({_id:req.params.id}, function (err, posts) {
      if (err) {
        res.send({err});
      } else {
        console.log("Data deleted Successfully");
        res.redirect(`/`);
      }
    });
  },
  async gallery(req, res){
    res.render("gallery/index", {page_name: "gallery"} );
  },
  async about(req, res){
    res.render("about/about-us",  {page_name: "about"} );
  },
  async contact(req, res){
    res.render("contact/contact" , {page_name: "contact"} ); 
  },
  async services(req, res){
    res.render("services/index" , {page_name: "services"} ); 
  },
  async initiatives(req, res){
    res.render("initiatives/index" , {page_name: "initiatives"} ); 
  },
  async Register(req, res) {
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.email == null ||req.body.username == null  ||req.body.password == null ){
      
      // res.flash("error","Incomplete fields please go back and try again")
    } else {
      User.find({ email : req.body.email },(err,user)=>{
        if(err){
        console.log(err); 
        }else{
          User.register(new User({ email: req.body.email , username: req.body.username }), req.body.password, (err, user) => {
            if (err) {
              // req.flash("error","fuckerrr has an error");
              return res.render("auth/register", { page_name : "register"});
            } else {
              passport.authenticate("local")(req, res, () => {
                res.redirect("/blog")
              });
            }
          })
        }
      });
    
    }
  }
}
