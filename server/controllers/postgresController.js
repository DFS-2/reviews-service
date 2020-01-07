const post = require('../../database/postModel.js')
module.exports = {
    reviews: {
      get: (req, res) => {
        post.getReviews(req.params.hostId, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(results);
          }
        });
      },
      insert: (req, res) => {
        post.insertReview(req, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(results);
          }
        })
      }
    },
  };