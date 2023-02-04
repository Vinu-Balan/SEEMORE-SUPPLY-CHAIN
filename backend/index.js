var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
const {MongoClient} = require("mongodb")
var mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Vinu_Balan:8838010007dhanda@justwatch.kg8pffz.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log('connected to mongo');
})
.catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
// var fs = require('fs');
var user = require("./model/user.js");
var profile = require("./model/profile.js");
var tracker = require("./model/tracker.js");
var username = "";

app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/signup" || req.path=="/userget" || req.path =="/profile" || req.path =="/getmanufacturers" || req.path == "/getretailers" || req.path =="/getdistributors" || req.path == "/userprofile" || req.path == "/createtracker" || req.path=="/gettracker"|| req.path == "/delivered" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});

/* login api */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {

          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }

        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});


/* register api */
app.post("/signup", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {

      user.find({ username: req.body.username }, (err, data) => {

        if (data.length == 0) {

          let User = new user({
            username: req.body.username,
            password: req.body.password,
            // category: req.body.category
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              res.status(200).json({
                status: true,
                title: 'Registered Successfully.'
              });
              console.log(User);
            }
          });

        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true,
        user: data.username
      });
      username = data.username;
    }
  });
}

app.get("/userget",(req,res) =>{
  try {
    res.status(200).json({
                user: username
              });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})
/* profile update */ 
app.post("/profile", (req, res) => {
  try {
    console.log(req.username);
    profile.find({ username : req.body.username }, (err, data) => {

      if (data.length == 0) {

        let Profile = new profile({
          username: req.body.username,
          name: req.body.name,
          location: req.body.location,
          contact: req.body.contact,
          type:  req.body.type,
          bio: req.body.bio
        });
        Profile.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false
            });
            console.log(err);
          } else {
            res.status(200).json({
              status: true,
              title: 'Updated Successfully.'
            });
            console.log(Profile);
          }
        });

      }else if(data.length==1){
        try{
          console.log("User exists!");
          profile.deleteOne(
            { username: username },function(err, obj) {
              if (err) throw err;
              console.log("old profile deleted");
            });
            let Profile = new profile({
              username: req.body.username,
              name: req.body.name,
              location: req.body.location,
              contact: req.body.contact,
              type:  req.body.type,
              bio: req.body.bio
            });
            Profile.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
                // console.log(err);
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Updated Successfully.'
                });
                // console.log(Profile);
              }
            });
        }catch(err){
          console.log(err);
        }
        
      }else {
        res.status(400).json({
          errorMessage: `UserName ${req.body.username} Already Exist!`,
          status: false
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

app.get("/userprofile",(req,res) =>{
  try {
    profile.find({username : username}, (err, data) => {
      res.status(200).json({
        user: username,
        details: data
      });
    });    
    
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.post("/gettracker",(req,res) =>{
  try {
    // console.log(req.body.type);
    if(req.body.type[0]=="M"){
      tracker.find({man_id: username}, (err, data) => {
        res.status(200).json({
          user: username,
          details: data
        });
      });    
    }else if(req.body.type[0]=="d"){
      console.log(req.body.type);
      tracker.find({dist_id: username}, (err, data) => {
        res.status(200).json({
          user: username,
          details: data
        });
      });    
    }else if(req.body.type[0]=="r"){
      tracker.find({ret_id: username}, (err, data) => {
        res.status(200).json({
          user: username,
          details: data
        });
      });    
    }else{
      tracker.find({}, (err, data) => {
        res.status(200).json({
          user: username,
          details: data
        });
      });    
    }
    
    
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})
app.post("/delivered", (req, res) => {
  try {
    // console.log(req.body.package_id);
        try{
          tracker.remove(
            { pack_id: req.body.package_id },function(err, obj) {
              if (err) throw err;
              console.log(" document(s) deleted");
            });
        }catch(err){
          console.log(err);
        }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
    console.log(e);
  }

});

app.get("/getmanufacturers",(req,res) =>{
  try {
    profile.find({type: "Manufacturer"}, (err, data) => {
      res.status(200).json({
        user: username,
        details: data
      });
    });
    
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})
app.get("/getretailers",(req,res) =>{
  try {
    profile.find({type: "retailer"}, (err, data) => {
      res.status(200).json({
        user: username,
        details: data
      });
    });
    
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/getdistributors",(req,res) =>{
  try {
    profile.find({type: "distributor"}, (err, data) => {
      res.status(200).json({
        user: username,
        details: data
      });
    });
    
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.post("/createtracker", (req, res) => {
  try {
        let max = 9999;
        let min = 1000;
        var pack_id = Math.floor(Math.random() * (max - min + 1) + min)
        let Tracker = new tracker({
          pack_id: pack_id,
          dist_id: username,
          man_id: req.body.man_id,
          ret_id: req.body.ret_id,
          req_date: req.body.req_date,
          req_time: req.body.req_time,
          source: req.body.source,
          dest: req.body.dest,
          contact: req.body.contact
        });
        Tracker.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false
            });
            console.log(err);
          } else {
            res.status(200).json({
              status: true,
              title: 'Updated Successfully.'
            });
          }
        });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});