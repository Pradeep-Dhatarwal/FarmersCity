const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/users.js");
const news = require("../models/news.js");
const middleware = require("../middleware/index.js");
const newsController = require("../controllers/news");

//*=================================//
//*          Index route            //
//*=================================//
router.get("/", middleware.asyncErrorHandler(newsController.newsIndex));

//*=================================//
//*             New route           //
//*=================================//
router.get(`/new`, middleware.isLoggedIn(), middleware.asyncErrorHandler(newsController.newNews));

//*=================================//
//*            Create route         //
//*=================================//
router.post(`/`, middleware.isLoggedIn(), middleware.asyncErrorHandler(newsController.createNews));

//*=================================//
//*            Show route           //
//*=================================//
router.get("/:slug", middleware.asyncErrorHandler(newsController.showNews));

//*=================================//
//*            Edit route           checkPostOwnership //
//*=================================//
router.get("/:slug/edit", middleware.isLoggedIn(), middleware.asyncErrorHandler(newsController.editNews));

//*=================================//
//*          update route           //
//*=================================//
router.put("/:slug", middleware.checkPostOwnership(), middleware.asyncErrorHandler(newsController.updateNews));

//*=================================//
//*          delete route           //
//*=================================//
router.delete(	"/:slug",	middleware.checkPostOwnership(),	middleware.isLoggedIn(),	middleware.asyncErrorHandler(newsController.deletePost));

module.exports = router;
