const { db } = require("./server/db");
const Moogle = require("./server/db/MoogleModel");
const Chocobo = require("./server/db/ChocoboModel");

const moogleData = [{ name: "Mog" }, { name: "Mallary" }, { name: "Britney" }];
const chocoboData = [
  { name: "Chocobolina" },
  { name: "Chocolate" },
  { name: "Prompto" },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Moogle.bulkCreate(moogleData);
    await Chocobo.bulkCreate(chocoboData);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
