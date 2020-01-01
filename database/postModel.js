const { Pool, Client } = require('pg');

const startTime = new Date();

const pool = new Pool({
  user: 'Strider',
  host: 'localhost',
  database: 'reviewmodule',
  password: null,
  port: 5432
});

module.exports = {
    getReviews: (hostId, callback) => {
        const start = new Date();
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
                console.log(new Date() - start);
            })
            .catch(err => callback(err));
    }
};
