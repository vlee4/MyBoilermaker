const db = require("./database");
const Moogle = require("./MoogleModel");
const Chocobo = require("./ChocoboModel");

//Establish associations
Chocobo.belongsTo(Moogle);
Moogle.hasMany(Chocobo);

module.exports = {
  db,
  Chocobo,
  Moogle,
};
