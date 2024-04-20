const PossibleBrands = require("../models/possibleBrands");
const PossibleTypes = require("../models/possibleType");
const Device = require("../models/device");
const { fakerEN_US } = require("@faker-js/faker");
const Controller = require("../controllers/crudController");

const possibleTypes = new PossibleTypes();
const possibleBrands = new PossibleBrands();

module.exports = {
  generateDevice: function () {
    const allTypes = possibleTypes.getAllTypes();
    const allBrands = possibleBrands.getAllBrands();
    const categories = Object.keys(allTypes);
    let randomCategory = fakerEN_US.helpers.arrayElement(categories);
    let randomType = fakerEN_US.helpers.arrayElement(allTypes[randomCategory]);
    let randomBrand = fakerEN_US.helpers.arrayElement(
      allBrands[randomCategory]
    );
    let randomName = fakerEN_US.person.fullName();
    let randomAccessories = fakerEN_US.datatype.boolean();
    let randomWarranty = fakerEN_US.datatype.boolean();
    let randomDate = fakerEN_US.date.past();
    let randomId = fakerEN_US.number.int();
    return new Device(
      randomId,
      randomCategory,
      randomType,
      randomBrand,
      randomName,
      randomAccessories,
      randomWarranty,
      randomDate
    );
  },
  startGeneratingDevices: function (callback) {
    setInterval(() => {
      const newDevice1 = this.generateDevice();
      const newDevice2 = this.generateDevice();
      const newDevice3 = this.generateDevice();
      Controller.addDevice(newDevice1);
      Controller.addDevice(newDevice2);
      Controller.addDevice(newDevice3);
      callback([newDevice1, newDevice2, newDevice3]);
    }, 50000);
  },
};
