// const Sequelize = require("sequelize");

// //Creates new Sequelize instance which is what creates the connection to your db
// // if you're deploying your app via Heroku and use Heroku Postgres the db url in your Heroku env is available via the env variable DATABASE_URL. The line below checks to see if it can connect to there first before connecting to the local db
// const db = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost:1337/boilermaker",
//   {
//     logging: false, //can change to true if you want the logs
//   }
// );
// //Bring together your Sequelize instance (db) with your modelss
// const Moogle = require("./MoogleModel");
// const Chocobo = require("./ChocoboModel");

// //Establish associations
// Chocobo.belongsTo(Moogle);
// Moogle.hasMany(Chocobo);

// module.exports = {
//   db,
//   Chocobo,
//   Moogle,
// };
