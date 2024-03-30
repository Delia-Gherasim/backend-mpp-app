const DeviceManager = require("../models/deviceManager");
const PossibleTypes = require("../models/possibleType");

const devices = new DeviceManager().getAllDevices();
module.exports = {
  totalNumberOfitems: function () {
    return devices.length;
  },
  getPagesOfNItems: function (numberOfItems, pageNumber) {
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
    return devices.getAllDevices();
  },
};
