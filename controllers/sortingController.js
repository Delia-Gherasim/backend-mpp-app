const DeviceManager = require("../models/deviceManager");

const devices = new DeviceManager().getAllDevices();
module.exports = {
  sortByTypeAscending: function () {
    const sortedArray = devices.slice();
    sortedArray.sort((a, b) => {
      if (a.type < b.type) {
        return -1;
      } else if (a.type > b.type) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  },
  sortByCategoryAscending: function () {
    const sortedArray = devices.slice();
    sortedArray.sort((a, b) => {
      if (a.category < b.category) {
        return -1;
      } else if (a.category > b.category) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  },
  sortByBrandAscending: function () {
    const sortedArray = devices.slice();
    sortedArray.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      } else if (a.brand > b.brand) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  },
  sortByOwnerAscending: function () {
    const sortedArray = devices.slice();
    sortedArray.sort((a, b) => {
      if (a.owner < b.owner) {
        return -1;
      } else if (a.owner > b.owner) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  },

  sortByDateAscending: function () {
    const sortedArray = devices.slice();
    sortedArray.sort((a, b) => {
      if (a.date.getDate() < b.date.getDate()) {
        return -1;
      } else if (a.date.getDate() > b.date.getDate()) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  },
};
