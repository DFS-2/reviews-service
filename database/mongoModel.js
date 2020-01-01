const mongo = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

const reviews = [];

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected');
    const db = client.db('reviewmodule');
    const start = new Date();
    db.collection('hosts').findOne({_id: 49465})
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            for (var i = 0; i < res.revIndexes.length; i++) {
                db.collection('reviews').findOne({_id: res.revIndexes[i]})
                .then(rev => {
                    const review = rev;
                    review.hostName = res.hostName;
                    review.hostImage = res.hostImage;
                    reviews.push(review);
                    console.log(new Date() - start);
                })
                .catch(err => console.log(err))
            }
        })
        .then(() => {
            client.close()
        })
        .catch(err => console.log(err))
    // const reviews = db.collection('reviews');
})
