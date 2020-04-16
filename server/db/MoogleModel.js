const db = require("./database");
const Sequelize = require("sequelize");

console.log("database", db);
const Moogle = db.define("moogle", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Moogle;
