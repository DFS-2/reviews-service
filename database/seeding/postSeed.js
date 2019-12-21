const fs = require('fs');
const json2csv = require('json2csv').parse;
const faker = require('faker');
const path = require('path');
const { Pool, Client } = require('pg');

const startTime = new Date();

const pool = new Pool({
  user: 'Strider',
  host: 'localhost',
  database: 'reviewmodule',
  password: null,
  port: 5432
});

var hostCount = 0;
const seedHost = function(start, end) {
  if (hostCount === 5) {
    console.log('host done:', (new Date() - startTime))
    return;
  }
  hostCount++;
  let hostArray = [];
  for (var i = start; i <= end; i += 1) {
    const hostName = faker.name.firstName();
    const hostImage = faker.image.avatar();
    const hostData = { hostName, hostImage };
    hostArray.push(hostData);
  }
  
  const hostFields = ['hostName', 'hostImage'];

  const csvHosts = json2csv(hostArray, hostFields);

  
  fs.writeFileSync(path.resolve(__dirname, 'hosts.csv'), csvHosts);
  

    console.log('Host Seeding: ', hostCount);

    pool.query(`COPY hosts(hostName, hostImage) FROM '${path.resolve(__dirname, 'hosts.csv')}' DELIMITER ',';`, (err, res) => {
      if (err) console.log(err);
      seedHost(i + 1, i + 1000000);
    });
  
};
seedHost(1, 1000000)

hostArray = [];

var userCount = 0;

var seedUser = function(start, end) {
  if (userCount === 5) {
    console.log('user done:', (new Date() - startTime))
    var reviewCount = 0
    const seedReview = function(start, end) {
      if (reviewCount === 5) {
        console.log('user done:', (new Date() - startTime))
        return;
      }

      reviewCount++;

      const reviewsArray = [];

      for (var i = start; i <= end; i += 1) {
        const selected = [];
        const numbReviews = Math.ceil(Math.random() * 10);
        for (let j = 0; j <= numbReviews; j += 1) {
          const userId = Math.ceil(Math.random() * 5000000);
          if (selected.indexOf(userId) !== (-1)) {
            continue;
          } else {
            selected.push(userId);
          }
          const hostRes = Math.random() >= 0.5;
          const longRev = Math.random() <= 0.25;
          const date = faker.date.recent(100);
          const now = new Date();
          const hostResDate = faker.date.between(date, now);
          const obj = {
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
            hostId: i,
            hostRes: hostRes ? faker.lorem.paragraph() : null,
            hostResDate: hostRes ? hostResDate : null,
          };
          reviewsArray.push(obj);
        }
      }
      
      const reviewFields = [
        'userId', 'date', 'body', 'rating', 'cleanliness', 
        'communication', 'checkin', 'accuracy', 'location', 
        'value', 'quiRes', 'outHos', 'amaAme', 'styleSpa', 
        'spaCle', 'hostId', 'hostRes', 'hostResDate'
      ];
      
      const csvReviews = json2csv(reviewsArray, reviewFields);

      console.log('Reviews Seeding: ', reviewCount);
      
      fs.appendFileSync(path.resolve(__dirname, 'reviews.csv'), csvReviews);
      
      pool.query(`COPY 
                    reviews(userId, date, body, rating, cleanliness, communication, checkin, accuracy, 
                      location, value, quiRes, outHos, amaAme, stySpa, spaCle, hostId, hostRes, hostResDate)
                  FROM '${path.resolve(__dirname, 'reviews.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
        if (err) console.log(err);
        seedReview(i + 1, i + 1000000);
      });
    }
    seedReview(1, 1000000);
    return;
  }
  userCount++;

  let userArray = [];

  for (var i = start; i <= end; i += 1) {
    const name = faker.name.firstName();
    const image = faker.image.avatar();
    const userData = { name, image };
    userArray.push(userData);
  }
  
  const userFields = ['name', 'image']
  
  const csvUsers = json2csv(userArray, userFields);
  
  fs.writeFileSync(path.resolve(__dirname, 'users.csv'), csvUsers);

  console.log('User Seeding: ', userCount);
  
  pool.query(`COPY users(name, image) FROM '${path.resolve(__dirname, 'users.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) console.log(err);
    seedUser(i + 1, i + 1000000);
  });

}
seedUser(1, 1000000);

userArray = []

// var reviewCount = 0
// const seedReview = function(start, end) {
//   if (reviewCount === 5) {
//     console.log('user done:', (new Date() - startTime))
//     return;
//   }

//   reviewCount++;

//   const reviewsArray = [];

//   for (var i = start; i <= end; i += 1) {
//     const selected = [];
//     const numbReviews = Math.ceil(Math.random() * 10);
//     for (let j = 0; j <= numbReviews; j += 1) {
//       const userId = Math.ceil(Math.random() * 5000000);
//       if (selected.indexOf(userId) !== (-1)) {
//         continue;
//       } else {
//         selected.push(userId);
//       }
//       const hostRes = Math.random() >= 0.5;
//       const longRev = Math.random() <= 0.25;
//       const date = faker.date.recent(100);
//       const now = new Date();
//       const hostResDate = faker.date.between(date, now);
//       const obj = {
//         userId,
//         date,
//         body: longRev ? `${faker.lorem.paragraph()} ${faker.lorem.paragraph()}` : faker.lorem.paragraph(),
//         rating: Math.floor(Math.random() * 3 + 3),
//         cleanliness: Math.floor(Math.random() * 3 + 3),
//         communication: Math.floor(Math.random() * 3 + 3),
//         checkin: Math.floor(Math.random() * 3 + 3),
//         accuracy: Math.floor(Math.random() * 3 + 3),
//         location: Math.floor(Math.random() * 3 + 3),
//         value: Math.floor(Math.random() * 3 + 3),
//         quiRes: Math.random() >= 0.3,
//         outHos: Math.random() >= 0.3,
//         amaAme: Math.random() >= 0.3,
//         stySpa: Math.random() >= 0.3,
//         spaCle: Math.random() >= 0.3,
//         hostId: i,
//         hostRes: hostRes ? faker.lorem.paragraph() : null,
//         hostResDate: hostRes ? hostResDate : null,
//       };
//       reviewsArray.push(obj);
//     }
//   }
  
//   const reviewFields = [
//     'userId', 'date', 'body', 'rating', 'cleanliness', 
//     'communication', 'checkin', 'accuracy', 'location', 
//     'value', 'quiRes', 'outHos', 'amaAme', 'styleSpa', 
//     'spaCle', 'hostId', 'hostRes', 'hostResDate'
//   ];
  
//   const csvReviews = json2csv(reviewsArray, reviewFields);

//   console.log('Reviews Seeding: ', reviewCount);
  
//   fs.appendFileSync(path.resolve(__dirname, 'reviews.csv'), csvReviews);
  
//   pool.query(`COPY 
//                 reviews(userId, date, body, rating, cleanliness, communication, checkin, accuracy, 
//                   location, value, quiRes, outHos, amaAme, stySpa, spaCle, hostId, hostRes, hostResDate)
//               FROM '${path.resolve(__dirname, 'reviews.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
//     if (err) console.log(err);
//     seedReview(i + 1, i + 1000000);
//   });
// }
// seedReview(1, 1000000);