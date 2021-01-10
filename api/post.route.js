import express from 'express';
const postRoutes = express.Router();
import mongoose from 'mongoose';
import Post from './post.model.js';

let lists = [];

mongoose.connect('mongodb://localhost:27017/mevncrud', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    mongoose.connection
      .collection('posts')
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        lists = result;
        console.log(lists);
      });
    console.log('Database is connected');
  },
  err => {
    console.log('Can not connect to the database' + err);
  }
);
// mongodb.MongoClient.connect('mongodb://localhost:27017/mevncrud', (err, client) => {
//   if (err) throw err;
//   client
//     .db('mevncrud')
//     .collection('posts')
//     .find()
//     .toArray(function(err, result) {
//       if (err) throw err;
//       lists = result;
//       console.log(lists);
//       client.close();
//     });
// });

// Defined get data(index or listing) route
postRoutes.route('/').get(function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.json(err);
    } else {
      res.json(posts);
    }
  });
  //res.send(lists);
});

/* postRoutes.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  res.send(lists.find(a => a._id == id).body);
}); */

postRoutes.route('/add').post((req, res) => {
  console.log(req.body)
  let post = new Post(req.body);
  post
    .save()
    .then(() => {
      res.status(200).json({ business: 'business in added successfully' });
    })
    .catch(() => {
      res.status(400).send('unable to save to database');
    });
});

// Defined edit route
postRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Post.findById(id, function(err, post) {
    if (err) {
      res.json(err);
    }
    res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').post(function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    //console.log(post);
    if (!post) res.status(404).send('data is not found');
    else {
      post.title = req.body.title;
      post.body = req.body.body;
      post
        .save()
        .then(() => {
          res.json('Update complete');
        })
        .catch(() => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').delete(function(req, res) {
  console.log(req.params)
  Post.findByIdAndRemove({ _id: req.params.id }, function(err) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

export default postRoutes;
