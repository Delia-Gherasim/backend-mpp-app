const DeviceManager = require("../repository/deviceManager");
const deviceManager = new DeviceManager();
const controller = require("../controllers/crudController");

module.exports = {
  totalNumberOfItems: function () {
    const devices = controller.getAll();
    return devices.length;
  },
  getPagesOfNItems: function (numberOfItems, pageNumber) {
    const devices = controller.getAll();
    const startIndex = (pageNumber - 1) * numberOfItems;
    const endIndex = pageNumber * numberOfItems;
    const totalPages = Math.ceil(devices.length / numberOfItems);
    const currentPage = pageNumber;

    const itemsForCurrentPage = devices.slice(startIndex, endIndex);

    return {
      totalItems: devices.length,
      totalPages: totalPages,
      currentPage: currentPage,
      items: itemsForCurrentPage,
    };
  },
  getAllItems: function () {
    return controller.getAll();
  },

  updatePaginationData: function () {
    const totalItems = this.totalNumberOfItems();
    const totalPages = Math.ceil(totalItems / 10);
    return {
      totalItems: totalItems,
      totalPages: totalPages,
    };
  },
};
