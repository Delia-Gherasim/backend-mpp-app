const PossibleBrands = require("../models/possibleBrands");
const PossibleTypes = require("../models/possibleType");
const Device = require("../models/device");
const Client = require("../models/client");
const { fakerEN_US, faker, th } = require("@faker-js/faker");
const Controller = require("../controllers/crudController");
const clientController = require("../controllers/clientsController");

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
    let clientId = 0;
    let randomAccessories = fakerEN_US.datatype.boolean();
    let randomWarranty = fakerEN_US.datatype.boolean();
    let randomDate = fakerEN_US.date.past();
    let randomId = fakerEN_US.number.int();
    return new Device(
      randomId,
      randomCategory,
      randomType,
      randomBrand,
      clientId,
      randomAccessories,
      randomWarranty,
      randomDate
    );
  },
  generateClient: function () {
    let id = fakerEN_US.number.int();
    let name = fakerEN_US.person.firstName();
    let surname = fakerEN_US.person.lastName();
    let phoneNumber = faker.number
      .int({ min: 1000000000, max: 9999999999 })
      .toString();
    let specailChar = false;
    let provider = "gmail.com";
    let _email = fakerEN_US.internet.email({
      name,
      surname,
      provider,
      specailChar,
    });
    let details = fakerEN_US.lorem.sentence();
    let debt = fakerEN_US.number.int({ min: 0, max: 1000 });

    return new Client(id, name, surname, phoneNumber, _email, debt, details);
  },
  
  startGeneratingDevices: function (callback) {
    setInterval(async () => {
      const newDevice1 = this.generateDevice();
      const newDevice2 = this.generateDevice();
      const newDevice3 = this.generateDevice();
      const newClient1 = this.generateClient();
      const newClient2 = this.generateClient();
  
      try {
        const addedClient1 = await clientController.addClient(newClient1);
        const addedClient2 = await clientController.addClient(newClient2);
        newDevice1.owner = addedClient1.name+" "+addedClient1.surname;
        newDevice2.owner = addedClient1.name+" "+addedClient1.surname;
        newDevice3.owner = addedClient1.name+" "+addedClient1.surname;

        await Controller.addDevice(newDevice1);
        await Controller.addDevice(newDevice2);
        await Controller.addDevice(newDevice3);
        callback([newDevice1, newDevice2, newDevice3]);
      } catch (error) {
        console.error("Error while generating devices and clients:", error);
      }
    }, 100000000)}
  };
