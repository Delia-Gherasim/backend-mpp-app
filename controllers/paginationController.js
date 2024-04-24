const DeviceManager = require("../repository/deviceManager");
const deviceManager = new DeviceManager();
//const controller = require("../controllers/crudController");
module.exports = {
  totalNumberOfItems: async function () {
    const devices = await deviceManager.getAllDevices(); 
    return devices.length;
  },
  getPagesOfNItems: async function (numberOfItems, pageNumber) {
    const devices = await deviceManager.getAllDevices();
    //console.log("pagination controller:", devices); 
    
    const startIndex = (pageNumber - 1) * numberOfItems;
    const endIndex = pageNumber * numberOfItems;
    const totalPages = Math.ceil(devices.length / numberOfItems);
    const currentPage = pageNumber;

    //console.log("start Index", startIndex, "endIndex:", endIndex, "totalPages", totalPages);
    const itemsForCurrentPage = devices.slice(startIndex, endIndex); 
    //console.log(itemsForCurrentPage);
    return {
      totalItems: devices.length,
      totalPages: totalPages,
      currentPage: currentPage,
      items: itemsForCurrentPage,
    };
  },
  getAllItems: async function () {
    return await deviceManager.getAllDevices(); 
  },
  updatePaginationData: async function () {
    const totalItems = await this.totalNumberOfItems(); 
    const totalPages = Math.ceil(totalItems / 10);
    return {
      totalItems: totalItems,
      totalPages: totalPages,
    };
  },
};