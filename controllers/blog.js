
const Post = require('../models/posts');

postController = {
  async postIndex(req, res, next) {
    let recentPosts = await Post.find({}).sort([['date', -1]]).limit(2).exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        recentPosts = data;
      }
    });
    let posts = await Post.paginate( {},{
      page: req.query.page || 1,
      limit: 5,
      sort: { "date": -1 }
    });
    posts.page = Number(posts.page);
    // console.log(posts)
    res.render("blog/blog", { posts, title: 'Posts Index', recent: recentPosts , page_name: "blog" });
  },
  async newPost(req, res){
    res.render("blog/new", { page_name: "blog" } );
  },
  async createPost(req, res) {
    req.body.post.author = { id: req.user._id, username: req.user.username }
  
    if (req.body.post.image == "" || req.body.post.name == "" || req.body.post.description == "") {
      res.render("blog/new");
    } else {
      Post.create(req.body.post, function (err, posts) {
        if (err) {
          res.send(alert(err));
        } else {
          console.log("Data added Successfully");
          res.redirect(`/blog`);
        }
      });
    }
  },
  async showPost(req, res) {
    Post.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("blog/blog-details", { post: data ,page_name: "blog" });
      }
    })
  },
  async editPost(req, res) {
    Post.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        res.render("blog/blog-edit", { post: data ,page_name: "blog" });
      }
    }).sort({age : 1});
  
  },
  async updatePost(req, res) {
    req.body.post.author = { id: req.user._id, username: req.user.username };
    Post.findOneAndUpdate(
      { myslug: req.params.slug },
      req.body.post,
      function (err) {
        if (err) {
          console.log(err);
        } else {
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
}
module.exports = postController;