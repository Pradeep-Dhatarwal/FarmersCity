const { asyncErrorHandler }                                                                = require('../middleware/index.js');
const {	Index ,files, Register , about , gallery , contact , services, initiatives , topSelling , updateTopSelling , deleteTopSelling }                 = require('../controllers/index.js');

const express = require('express');
const router = express.Router({mergeParams:true}),
      passport = require("passport"),
      Post = require("../models/posts.js"),
      TopSelling = require("../models/topSelling.js"),
      User = require("../models/users.js"),
      multer = require('multer'), 
      fs = require('fs'), 
      path = require('path'), 
      storage = multer.diskStorage({ destination: (req, file, cb) => { 
          cb(null,  'public/uploads') ;
        }, 
        filename: function (req, file, cb) {
          console.log(file);
          if (fs.existsSync(path.join("public/uploads",file.originalname))) {
            cb(null, file.originalname+"(1)");
          }else{
            cb(null, file.originalname);
          }
      },
    }),
      upload = multer({ storage: storage }); 

      // express().use(express.static('/public'));
/* GET home page. */

router.get('/', asyncErrorHandler(Index));

router.post('/top-selling', upload.single('topimage'),  asyncErrorHandler(topSelling));

router.put('/top-selling/:id',upload.single('topimage'), asyncErrorHandler(updateTopSelling));

router.delete('/top-selling/:id', asyncErrorHandler(deleteTopSelling));

router.get('/cron', (req,res)=>{
  res.status("200");
  res.json({ "job running": true });
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
  res.render("auth/register", {page_name : "register"});
});

router.post("/register", asyncErrorHandler(Register));
// *=================================//
// *          files Route            //
// *=================================//
router.get('/files', asyncErrorHandler(files));
router.post('/upload',upload.single("file") , (req,res)=>{
  res.json({"location": " \\uploads\\"+ req.file.originalname});
} );
// *=================================//
// *           Login Route           //
// *=================================//
router.get("/login", (req, res) => { 
  res.render("auth/login" , {message: req.flash("error") , page_name : "login"});
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