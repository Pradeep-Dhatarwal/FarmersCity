
const News = require('../models/news');

newsController = {
  async newsIndex(req, res, next) {
    let recentNews = await News.find({}).sort([['date', -1]]).limit(2).exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        recentNews = data;
      }
    });
    let news = await News.paginate( {},{
      page: req.query.page || 1,
      limit: 5,
      sort: { "date": -1 }
    });
    news.page = Number(news.page);
    // console.log(news)
    res.render("news/news", { news, title: 'News Index', recent: recentNews , page_name: "news" });
  },
  async newNews(req, res){
    res.render("news/new" ,{page_name: "blog"});
  },
  async createNews(req, res) {

    req.body.news.author = { id: req.user._id, username: req.user.username }
  
    if (req.body.news.image == "" || req.body.news.name == "" || req.body.news.description == "") {
      req.flash("error","please fill all the fields correctly")
      res.render("news/new");
    } else {
      News.create(req.body.news, function (err, news) {
        if (err) {
          console.log(err);
        } else {
          console.log("Data added Successfully");
          res.redirect(`/news`);
        }
      });
    }
  },
  async showNews(req, res) {
    News.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("news/newsDetail", { news: data ,  page_name: "blog" });
      }
    })
  },
  async editNews(req, res) {
    News.findOne({ myslug: req.params.slug }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        res.render("news/news-edit", { news: data , page_name: "blog"  });
      }
    }).sort({age : 1});
  
  },
  async updateNews(req, res) {
    req.body.news.author = { id: req.user._id, username: req.user.username };
    News.findOneAndUpdate(
      { myslug: req.params.slug },
      req.body.news,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/news/` + req.params.slug);
        }
      }
    );
  },
  async deleteNews(req, res) {
    News.findOneAndDelete({ myslug: req.params.slug }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/news");
      }
    });
    }
}
module.exports = newsController;