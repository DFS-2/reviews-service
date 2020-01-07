const { Pool, Client } = require('pg');

const startTime = new Date();

const pool = new Pool({
  user: 'power_user',
  host: '52.53.208.83',
  database: 'reviewmodule',
  password: 'password',
  port: 5432
});

module.exports = {
    getReviews: (id, callback) => {

        const hostId = id || Math.ceil(Math.random() * 5000000);

        pool.query(`SELECT 
                        * 
                    FROM
                        reviews
                    INNER JOIN hosts ON hosts.hostId = reviews.hostId
                    INNER JOIN users ON users.userId = reviews.userId
                    WHERE
                        reviews.hostId = ${hostId}
                    ORDER BY
                        reviews.date DESC`)
            .then(res => {
                callback(null, res.rows);
            })
            .catch(err => callback(err));
    },
    insertReview: (review, callback) => {
        pool.query(`INSERT INTO reviews (userId, date, body, rating, cleanliness, communication, checkin, accuracy, 
                                         location, value, quiRes, outHos, amaAme, stySpa, spaCle, hostId, hostRes, hostResDate)
                            VALUES (${review.userId}, ${review.date}, ${review.body}, ${review.rating}, ${review.cleanliness}, ${review.communication},
                                    ${review.checkin}, ${review.accuracy}, ${review.location}, ${review.value}, ${review.quiRes}, ${review.outHos},
                                    ${review.amaAme}, ${review.stySpa}, ${review.spaCle}, ${review.hostId}, ${review.hostRes}, ${review.hostResDate})`)
            .then(res => callback(null, res))
            .catch(err => callback(err));
    }
};