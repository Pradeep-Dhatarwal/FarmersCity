
var mongoose = require('mongoose');
//Set up default mongoose connection
require(`dotenv`).config();
var Post = require("./models/posts.js");
var Category = require("./models/categories.js");
const { post } = require('./app.js');

mongoose.connect( process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(!err){
    console.log("Database connected successfully")
  } else (
    console.log(err)
  )
});
//Get the default connection


var Posts = [
  {
    heading: "White Water Creek ",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
    slug:`white-water-creek`
  },
  {
    heading: "Camp Bestival ",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm2.staticflickr.com/1291/4677961495_2c1ce8c73a.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
    slug:`camp-bestival`
  },
  {
    heading: "Starry Camp",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
    slug:`starry-camp`
  },
  {
    heading: "Occoneechee State Park ",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
    slug:`occoneechee-state-park`
  },
  {
    heading: "Scout Camp 2012",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
    slug:`scout-camp-2012`
  },
  {
    heading: "Wye Valley Camping ",
    author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
    image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
    description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                  <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                  <blockquote>
                    <p>
                      Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                    </p>
                    <span>Steve Maraboli</span>
                  </blockquote>

                  <h5>Conclusion</h5>

                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
  slug:`wye-valley-camping`
 }, {
  heading: "Unknown forest ",
  author: { id: "5f481da376d7821cd430c6e0", username: '123123' },
  image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
  description: ` <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged.</p>

                <p>And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent. You may voluntarily plant in your subconscious mind any plan, thought or purpose which you desire to translate into its physical counterpart, and that counterpart will manifest itself for you. Creative, prolific and ever-ready to serve you. Yet so few of us understand how to use its power.</p>

                <blockquote>
                  <p>
                    Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.
                  </p>
                  <span>Steve Maraboli</span>
                </blockquote>

                <h5>Conclusion</h5>

                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged. And finally the subconscious is the mechanism through which thought impulses which are repeated regularly with feeling and emotion are quickened, charged and changed into their physical equivalent.</p>`,
slug:`Unknown forest`
}
];


function seedDB() {
  Post.deleteMany({},(err)=>{
  if(err){
  console.log(err);
  }
  })
  Category.deleteMany({},(err)=>{
    if(err){
    console.log(err);
    }
    })
    Category.create({category: "ecommerce"} , (err,returnedCategory)=>{
      if(err){
      console.log(err);
      }else{
        Posts.forEach(data => {
          Post.create(data , (err,data)=>{
            if(err){
              console.log(err);
            }else{
              data.category = returnedCategory._id
              data.category.name = returnedCategory.name
              data.save()
            }
          })    
        });

      }
    })
  
}

//Bind connection to error event (to get notification of connection errors)
seedDB();