const Sequelize = require('sequelize');

const sequelize = new Sequelize('LemonLoftReviews', 'root', 'Poncione8!9', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Review = sequelize.define('reviews', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATE,
  },
  body: {
    type: Sequelize.STRING(5000),
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  cleanliness: {
    type: Sequelize.INTEGER,
  },
  communication: {
    type: Sequelize.INTEGER,
  },
  checkin: {
    type: Sequelize.INTEGER,
  },
  accuracy: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.INTEGER,
  },
  value: {
    type: Sequelize.INTEGER,
  },
  quiRes: {
    type: Sequelize.BOOLEAN,
  },
  outHos: {
    type: Sequelize.BOOLEAN,
  },
  amaAme: {
    type: Sequelize.BOOLEAN,
  },
  stySpa: {
    type: Sequelize.BOOLEAN,
  },
  spaCle: {
    type: Sequelize.BOOLEAN,
  },
  hostId: {
    type: Sequelize.INTEGER,
  },
  hostRes: {
    type: Sequelize.STRING(5000),
  },
  hostResDate: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

const User = sequelize.define('users', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(40),
  },
  image: {
    type: Sequelize.STRING(100),
  },
}, {
  timestamps: false,
});

const Host = sequelize.define('hosts', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hostName: {
    type: Sequelize.STRING(40),
  },
  hostImage: {
    type: Sequelize.STRING(100),
  },
}, {
  timestamps: false,
});

module.exports = {
  getReviews: (hostId, callback) => {
    let hostIdSQL = hostId;
    if (!hostId) {
      hostIdSQL = 1;
    }
    sequelize.query(`SELECT * FROM reviews
      INNER JOIN hosts ON hosts._id = reviews.hostId
      INNER JOIN users ON users._id = reviews.userId
      WHERE hostId = ${hostIdSQL} ORDER BY reviews.date DESC`)
      .then((data) => {
        console.log(data);
        callback(null, data);
      })
      .catch((err) => {
        console.log('There was an error getting review data: ', err);
      });
  },
};

module.exports.Review = Review;
module.exports.User = User;
module.exports.Host = Host;
module.exports.sequelize = sequelize;
