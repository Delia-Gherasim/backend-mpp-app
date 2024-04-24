const DeviceManager = require("../repository/deviceManager");
const PossibleTypes = require("../models/possibleType");

module.exports = {
  getDevices: async () => {
    const devices = await new DeviceManager().getAllDevices();
    return devices;
  },

  percentagesOfEachCategory: async function () {
    const devices = await this.getDevices();
    const categories = {};
    const totalDevices = devices.length;

    devices.forEach((device) => {
      const category = device.category.toLowerCase();
      categories[category] = (categories[category] || 0) + 1;
    });

    const percentages = Object.entries(categories).map(([category, count]) => ({
      category,
      percentage: (count / totalDevices) * 100,
    }));

    return percentages;
  },

  percentagesOfEachTypeForACategory: async function (category) {
    const devices = await this.getDevices();
    const categoryDevices = devices.filter(
      (element) => element.category === category
    );

    const typeCounts = {};
    categoryDevices.forEach((device) => {
      const type = device.type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const totalDevicesInCategory = categoryDevices.length;
    const percentages = {};

    for (const type in typeCounts) {
      percentages[type] = (typeCounts[type] / totalDevicesInCategory) * 100;
    }

    return percentages;
  },

  percentagesOfEachBrandForAType: async function (category) {
    const devices = await this.getDevices();
    const categoryDevices = devices.filter(
      (element) => element.category === category
    );

    const brandCounts = {};
    categoryDevices.forEach((device) => {
      const brand = device.brand;
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });

    const percentages = {};

    for (const brand in brandCounts) {
      percentages[brand] = (brandCounts[brand] / categoryDevices.length) * 100;
    }

    return percentages;
  },

  countOwnerWithMostDevices: async function () {
    const devices = await this.getDevices();
    const owners = {};

    devices.forEach((device) => {
      const owner = device.owner;
      owners[owner] = (owners[owner] || 0) + 1;
    });

    let maxOwner = "";
    let maxDevices = 0;

    for (const owner in owners) {
      if (owners[owner] > maxDevices) {
        maxDevices = owners[owner];
        maxOwner = owner;
      }
    }

    return { owner: maxOwner, devices: maxDevices };
  },
};
