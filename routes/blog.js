const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const middleware = require("../middleware/index.js");
const postController = require("../controllers/blog");
//*=================================//
//*          Index route            //
//*=================================//
router.get("/", middleware.asyncErrorHandler(postController.postIndex));

//*=================================//
//*             New route           //
//*=================================//
router.get(`/new`, middleware.isLoggedIn(), middleware.asyncErrorHandler(postController.newPost));

//*=================================//
//*            Create route         //
//*=================================//
router.post(`/`, middleware.isLoggedIn(), middleware.asyncErrorHandler(postController.createPost));

//*=================================//
//*            Show route           //
//*=================================//
router.get("/:slug", middleware.asyncErrorHandler(postController.showPost));

//*=================================//
//*            Edit route           checkPostOwnership //
//*=================================//
router.get("/:slug/edit", middleware.isLoggedIn(), middleware.asyncErrorHandler(postController.editPost));

//*=================================//
//*          update route           //
//*=================================//
router.put("/:slug", middleware.checkPostOwnership(), middleware.asyncErrorHandler(postController.updatePost));

//*=================================//
//*          delete route           //
//*=================================//
router.delete(
	"/:slug",
	middleware.checkPostOwnership(),
	middleware.isLoggedIn(),
	middleware.asyncErrorHandler(postController.deletePost)
);

module.exports = router;
