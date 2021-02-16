
const Post = require('../models/posts');
const path = require('path');
const description = require("../seo/seo");
postController = {
  async postIndex(req, res, next) {
    // let recentPosts = await Post.find({}).sort([['date', -1]]).limit(2).exec((err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     recentPosts = data;
    //   }
    // });
    let posts = await Post.paginate({}, {
      page: req.query.page || 1,
      limit: 5,
      sort: { "date": -1 }
    });
    posts.page = Number(posts.page);
    // console.log(posts)
    res.render("blog/blog", { posts, title: 'Posts Index', page_name: "blog" });
  },
  async newPost(req, res) {
    res.render("blog/new", { page_name: "blog" });
  },
  async createPost(req, res) { 
    let post = req.sanitize(req.body.post);
    console.log(post);
    post.author = { id: req.user._id, username: req.user.username };
    console.log(post);
    if (req.file) {
      post.image = req.file.path;
    }

    Post.create(post, function (err, posts) {
      console.log(posts);
      if (err) {
        res.send(err);
      } else {
        res.status("200");
        res.redirect(`/blog`);
      }
    });
  },
  async showPost(req, res) {
    Post.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("blog/blog-details", { post: data, page_name: "blog" });
      }
    });
  },
  async editPost(req, res) {
    Post.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.render("blog/blog-edit", { post: data, page_name: "blog" });
      }
    }).sort({ age: 1 });

  },
  async updatePost(req, res) {
    let post = req.body;
    post.author = { id: req.user._id, username: req.user.username };
    if (req.file) {
      post.image = path.join('/uploads/' + req.file.originalname);
    }
    post.description = req.sanitize(post.description);
    post.heading = req.sanitize(post.heading);
    post.pageDescription = req.sanitize(post.pageDescription);
    Post.findOneAndUpdate(
      { myslug: req.params.slug },
      post,
      function (err,post) {
        if (err) {
          res.send(err);
        } else {
          console.log(post);
          res.redirect(`/blog/` + req.params.slug);
        }
      }
    );
  },
  async deletePost(req, res) {
    Post.findOneAndDelete({ myslug: req.params.slug }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/blog");
      }
    });
  }
};
module.exports = postController;