const fs = require('fs');
const faker = require('faker');
const path = require('path');

const startTime = new Date();

var longParagraph = [];

for (var x = 0; x < 10000; x++) {
  longParagraph.push(faker.lorem.paragraph(sentence_count = 5));
}

var shortParagraph = [];

for (var y = 0; y < 10000; y++) {
  shortParagraph.push(faker.lorem.paragraph(sentence_count = 3));
}


let reviewCount = 0;

const createReviewCsv = function(index) {
  if (reviewCount === 10) {
    console.log('Review CSVs done:', (new Date() - startTime));
    return;
  }
  let hostIndex = index;
  reviewCount++
  const writeReviews = fs.createWriteStream(path.resolve(__dirname, `reviews${reviewCount}.csv`));
  writeReviews.write(`userId, date, body, rating, cleanliness, communication, checkin, accuracy, location, value, quiRes, outHos, amaAme, stySpa, spaCle, hostId, hostRes, hostResDate\n`, 'utf8');
  
  function writeAllReviews(writer, encoding, callback) {
    let i = 500000;
    let id = hostIndex;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const selected = [];
        const numbReviews = Math.ceil(Math.random() * 10);
        for (let j = 0; j <= numbReviews; j += 1) {
          const userId = Math.ceil(Math.random() * 5000000);
          if (selected.indexOf(userId) !== (-1)) {
            continue;
          } else {
            selected.push(userId);
          }
          const hostResCheck = Math.random() >= 0.5;
          const longRev = Math.random() <= 0.25;
          const now = new Date();
          const date = faker.date.recent(100);
          const hostRespDate = faker.date.between(date, now);
          const body = longRev ? longParagraph[Math.floor(Math.random() * 10000)] : shortParagraph[Math.floor(Math.random() * 10000)];
          const rating = Math.floor(Math.random() * 3 + 3);
          const cleanliness = Math.floor(Math.random() * 3 + 3);
          const communication = Math.floor(Math.random() * 3 + 3);
          const checkin = Math.floor(Math.random() * 3 + 3);
          const accuracy = Math.floor(Math.random() * 3 + 3);
          const location = Math.floor(Math.random() * 3 + 3);
          const value = Math.floor(Math.random() * 3 + 3);
          const quiRes = Math.random() >= 0.3;
          const outHos = Math.random() >= 0.3;
          const amaAme = Math.random() >= 0.3;
          const stySpa = Math.random() >= 0.3;
          const spaCle = Math.random() >= 0.3;
          const hostId = id;
          const hostRes = hostResCheck ? shortParagraph[Math.floor(Math.random() * 10000)] : null;
          const hostResDate = hostResCheck ? hostRespDate.toString() : null;
          const data = `${userId},${date.toString()},${body},${rating},${cleanliness},${communication},${checkin},${accuracy},${location},${value},${quiRes},${outHos},${amaAme},${stySpa},${spaCle},${hostId},${hostRes},${hostResDate}\n`;
          if (i === 0) {
            writer.write(data, encoding, callback);
          } else {
            ok = writer.write(data, encoding);
          }
        }
      } while (i > 0 && ok);
      if (i > 0) {
        writer.once('drain', write);
      }
    }
    write()
  }
  writeAllReviews(writeReviews, 'utf-8', () => {
    writeReviews.end();
    console.log(`CSV file Complete ${reviewCount}: `, new Date() - startTime);
    createReviewCsv(reviewCount * 500000)
  })
}
createReviewCsv(0);
