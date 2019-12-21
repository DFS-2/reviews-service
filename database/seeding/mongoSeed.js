const mongo = require('mongodb').MongoClient;
const faker = require('faker');

const url = 'mongodb://127.0.0.1:27017';
const startTime = new Date();

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
    const hosts = db.collection('hosts');
    const reviews = db.collection('reviews');
    let count = 0;
    const reSeed = function(start, end, hostStart, hostEnd, revStart, revEnd) {
        count++
        let hostArray = [];
        for (let i = hostStart; i <= hostEnd; i += 1) {
            var newHostStart = i;
            var revIndexes = [];
            // if (i / 1000 === parseInt(i / 1000)) {
            //     console.log('Seeding hosts', i)
            // }
            for (let h = start; h < end; h++) {
                revIndexes.push(h);
            }
            let _id = i;
            let hostName = faker.name.firstName();
            let hostImage = faker.image.avatar();
            let hostData = { _id, hostName, hostImage, revIndexes };
            hostArray.push(hostData);
            start += 10;
            end += 10;
        }
        console.log('done seeding hosts');
    
        let reviewsArray = [];
        for (let x = revStart; x <= revEnd; x += 1) {
            var newRevStart = x;
            // if (x / 10000 === parseInt(x / 10000)) {
            //     console.log('reviews seeding', x);
            // }
            _id = x;
            let userId = Math.ceil(Math.random() * 1000000);
            let hostRes = Math.random() >= 0.5;
            let longRev = Math.random() <= 0.25;
            let date = faker.date.recent(100);
            let now = new Date();
            let hostResDate = faker.date.between(date, now);
            let obj = {
                _id,
                userId,
                date,
                body: longRev ? `${faker.lorem.paragraph()} ${faker.lorem.paragraph()}` : faker.lorem.paragraph(),
                rating: Math.floor(Math.random() * 3 + 3),
                cleanliness: Math.floor(Math.random() * 3 + 3),
                communication: Math.floor(Math.random() * 3 + 3),
                checkin: Math.floor(Math.random() * 3 + 3),
                accuracy: Math.floor(Math.random() * 3 + 3),
                location: Math.floor(Math.random() * 3 + 3),
                value: Math.floor(Math.random() * 3 + 3),
                quiRes: Math.random() >= 0.3,
                outHos: Math.random() >= 0.3,
                amaAme: Math.random() >= 0.3,
                stySpa: Math.random() >= 0.3,
                spaCle: Math.random() >= 0.3,
                hostRes: hostRes ? faker.lorem.paragraph() : null,
                hostResDate: hostRes ? hostResDate : null,
                name: faker.name.firstName(),
                image: faker.image.avatar(),
            };
            reviewsArray.push(obj);
        }
        console.log('reviews done seeding');
    
        hosts.insertMany(hostArray, (err, result) => {
            if (err) console.log(err);
            console.log(new Date() - startTime);
            reviews.insertMany(reviewsArray, (err, result) => {
                if (err) console.log(err);
                console.log(new Date() - startTime);
                if (count === 1) {
                    client.close();
                    return;
                } else {
                    console.log('reSeed: ', count)
                    reSeed(start, end, newHostStart + 1, newHostStart + 100000, newRevStart + 1, newRevStart + 1000000);
                }
            })
        })
        console.log('done');
    }
    reSeed(1, 11, 1, 100000, 1, 1000000);

})
// var start = 1;
// var end = 11;
// var hostArr = [];
// for (var i = 1; i < 10000000; i++) {
//     var revIndexes = [];
//     for (var h = start; h < end; h++) {
//         revIndexes.push(h);
//     }
//     var _id = i;
//     var host = { _id, revIndexes };
//     hostArr.push(host);
//     start += 10;
//     end += 10;
// }