const createError = require('http-errors');
const express = require('express');
const expressSession = require("express-session");
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const methodOverride = require("method-override");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const multer = require('multer');
const flash = require("connect-flash");
const expressSanitizer = require('express-sanitizer');
const compression = require('compression');
const app = express();
if (process.env.NODE_ENV !== "production") {
  const logger = require('morgan');
  require('dotenv').config();
  app.use(logger('dev'));
}
app.use(compression());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log("Database connected successfully");
  } else {
    console.log(err);
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(expressSanitizer());
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single("image");
//*=================================//
//*       Import Models             //
//*=================================//
const User = require("./models/users.js");

//*=================================//
//*       Import routes             //
//*=================================//
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const newsRouter = require('./routes/news');



app.use(expressSession({
  secret: "gduqwhe8wjoqhwe8932h4euqgr89732g84qwrewrscbcnmlkjhgfdsapoiuytrewwq35b34h58i9025",
  resave: false,
  saveUninitialized: false
}));




app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// *=================================//
// *     Pass User to App Instance   //
// *=================================//
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
