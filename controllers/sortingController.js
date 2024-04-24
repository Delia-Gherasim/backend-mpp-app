const DeviceManager = require("../repository/deviceManager");

module.exports = {
  getDevices: async () => {
    const devices = await new DeviceManager().getAllDevices();
    return devices;
  },
  sortByTypeAscending: async function () {
    try {
      const devices = await this.getDevices();
      if (!Array.isArray(devices)) {
        throw new Error("Devices data is not an array");
      }
      const sortedArray = devices.slice();
      sortedArray.sort((a, b) => a.type.localeCompare(b.type));
      return sortedArray;
    } catch (error) {
      throw new Error("Error sorting by type: " + error.message);
    }
  },
  sortByCategoryAscending: async function () {
    try {
      const devices = await this.getDevices();
      if (!Array.isArray(devices)) {
        throw new Error("Devices data is not an array");
      }
      const sortedArray = devices.slice();
      sortedArray.sort((a, b) => a.category.localeCompare(b.category));
      return sortedArray;
    } catch (error) {
      throw new Error("Error sorting by category: " + error.message);
    }
  },
  sortByBrandAscending: async function () {
    try {
      const devices = await this.getDevices();
      if (!Array.isArray(devices)) {
        throw new Error("Devices data is not an array");
      }
      const sortedArray = devices.slice();
      sortedArray.sort((a, b) => a.brand.localeCompare(b.brand));
      return sortedArray;
    } catch (error) {
      throw new Error("Error sorting by brand: " + error.message);
    }
  },
  sortByOwnerAscending: async function () {
    try {
      const devices = await this.getDevices();
      if (!Array.isArray(devices)) {
        throw new Error("Devices data is not an array");
      }
      const sortedArray = devices.slice();
      sortedArray.sort((a, b) => a.owner.localeCompare(b.owner));
      return sortedArray;
    } catch (error) {
      throw new Error("Error sorting by owner: " + error.message);
    }
  },
  sortByDateAscending: async function () {
    try {
      const devices = await this.getDevices();
      if (!Array.isArray(devices)) {
        throw new Error("Devices data is not an array");
      }
      const sortedArray = devices.slice();
      sortedArray.sort((a, b) => a.date - b.date);
      return sortedArray;
    } catch (error) {
      throw new Error("Error sorting by date: " + error.message);
    }
  },
};
