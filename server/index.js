const express = require('express');
const mongoClient = require('mongodb').MongoClient();
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3001;
const mongoURL = "mongodb://localhost:27017/blog";

const uploading = multer({
  dest: __dirname + '/../blogg/uploads/',
})



app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, postman-token, Access-Control-Allow-Origin");
  next();;
})
//.........................................GET ROUTES...................................
app.get("/api/blogs", (req, res)=>{
  mongoClient.connect(mongoURL, (err, db)=>{
    if(err){
      console.log("there was an error connecting to mongodb using url " + mongoURL);
      console.log(err);
    }else{
      db.collection("blogPosts").find({},(err, result)=>{
        if(err) throw err;
        result.toArray().then(result=>{
          res.end(JSON.stringify(result));
        });
        // res.end(JSON.stringify(result));
        // console.log("if not working change result to array");
      })
      // console.log("connection to mongodb was successfull using " + mongoURL);
    }
  })
})


//.......................................POST ROUTES....................................

app.post("/api/blogs", (req, res)=>{
  mongoClient.connect(mongoURL, (err, db)=>{
    if(err){
      console.log("there was an error connecting to mongodb using url " + mongoURL);
      console.log(err);
    }else{
      db.collection("blogPosts").insertOne(req.body, (err, result)=>{
        if(err) throw err;
        console.log("blog post was saved in the database");
        db.close();
      })
    }
  })
})



//add new user into the database
app.post("/api/adduser",(req, res)=>{
  mongoClient.connect(mongoURL, (err, db)=>{
    if (err) throw err;
    db.collection("users").findOne({name:req.body.name}, (err, res)=>{
      if(!res){
        var myobj = req.body;
        db.collection("users").insertOne(myobj, (err, res)=> {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }

    });
  });
})


//upload file into the database
app.post("/api/upload", uploading.single('image'), (req, res)=>{
  console.log('works');
  mongoClient.connect(mongoURL, (err, db)=>{
    if (err) throw err;
    db.collection("blogPosts").findOne({title:req.body.title}, (err, res)=>{
      if(!res){
        var myobj = req.body;
        console.log(req.file);
        myobj.imageUrl = "uploads/" + req.file.filename;
        db.collection("blogPosts").insertOne(myobj, (err, res)=> {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }

    });
  });
})

app.listen(port, (err)=>{
  if(err){
    console.log("there was a problem with port " + port);
    console.log(err);
  }else{
    console.log("listening to port " + port);
  }
})
