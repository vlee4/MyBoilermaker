const db = require("./database");
const Sequelize = require("sequelize");

const Chocobo = db.define("chocobo", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Chocobo;
