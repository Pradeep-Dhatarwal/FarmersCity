const middleware = require("../middleware/index.js");
const postController = require("../controllers/blog");
const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const multer = require('multer');
const fs  = require("fs")
const path  = require("path")
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// console.log(file);
		cb(null, "public/uploads");
	},
		filename: function (req, file, cb) {
			console.log(file);
			if (fs.existsSync(path.join("public/uploads",file.originalname))) {
				cb(null, file.originalname+"(1)");
			}else{
				cb(null, file.originalname);
			}
	}
});
const upload = multer({ storage: storage });
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
router.post(`/`,middleware.isLoggedIn(), upload.single('postImg'), middleware.asyncErrorHandler(postController.createPost));

//*=================================//
//*            Show route           //
//*=================================//
router.get("/:slug", middleware.asyncErrorHandler(postController.showPost));

//*=================================//
//*            Edit route           checkPostOwnership //
//*=================================//
router.get("/:slug/edit",   middleware.asyncErrorHandler(postController.editPost));

//*=================================//
//*          update route           //
//*=================================//
router.put("/:slug",  upload.single('postImg'), middleware.asyncErrorHandler(postController.updatePost));

//*=================================//
//*          delete route           //
//*=================================//
router.delete( "/:slug" , middleware.isLoggedIn() , middleware.asyncErrorHandler(postController.deletePost) );

module.exports = router;
