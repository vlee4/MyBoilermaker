const Sequelize = require("sequelize");

//Creates new Sequelize instance which is what creates the connection to your db
// if you're deploying your app via Heroku and use Heroku Postgres the db url in your Heroku env is available via the env variable DATABASE_URL. The line below checks to see if it can connect to there first before connecting to the local db
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/boilermaker",
  {
    logging: false, //can change to true if you want the logs
  }
);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// // Models
// // console.log("database", db);
// const Moogle = db.define("moogle", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// const Chocobo = db.define("chocobo", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });
//Bring together your Sequelize instance (db) with your models
// const Moogle = require("./MoogleModel");
// const Chocobo = require("./ChocoboModel");

// //Establish associations
// Chocobo.belongsTo(Moogle);
// Moogle.hasMany(Chocobo);
// console.log("HERE's MY DB", db);

module.exports = db;
// module.exports = {
//   db,
//   Chocobo,
//   Moogle,
// };
