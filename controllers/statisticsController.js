const DeviceManager = require("../repository/deviceManager");
const PossibleTypes = require("../models/possibleType");

const deviceManager = new DeviceManager();

module.exports = {
  percentagesOfEachCategory: function () {
    const categories = {};
    const totalDevices = deviceManager.getAllDevices().length;

    deviceManager.getAllDevices().forEach((device) => {
      const category = device.category;
      if (!categories[category]) {
        categories[category] = 1;
      } else {
        categories[category]++;
      }
    });

    const percentages = Object.entries(categories).map(([category, count]) => ({
      category,
      percentage: (count / totalDevices) * 100,
    }));

    return percentages;
  },

  percentagesOfEachTypeForACategory: function (category) {
    const possibleTypes = new PossibleTypes();
    const categoryDevices = deviceManager
      .getAllDevices()
      .filter((element) => element.category === category);
    const typeCounts = {};

    categoryDevices.forEach((device) => {
      if (device.type) {
        if (!typeCounts[device.type]) {
          typeCounts[device.type] = 1;
        } else {
          typeCounts[device.type]++;
        }
      }
    });

    const totalDevicesInCategory = categoryDevices.length;
    const percentages = {};

    for (const type in typeCounts) {
      percentages[type] = (typeCounts[type] / totalDevicesInCategory) * 100;
    }

    return percentages;
  },

  percentagesOfEachBrandForAType: function (category) {
    const possibleTypes = new PossibleTypes();
    const categoryDevices = deviceManager
      .getAllDevices()
      .filter((element) => element.category === category);
    const typeCounts = {};

    categoryDevices.forEach((device) => {
      if (device.brand) {
        if (!typeCounts[device.brand]) {
          typeCounts[device.brand] = 1;
        } else {
          typeCounts[device.brand]++;
        }
      }
    });

    const totalDevicesInCategory = categoryDevices.length;
    const percentages = {};

    for (const brand in typeCounts) {
      percentages[brand] = (typeCounts[brand] / totalDevicesInCategory) * 100;
    }

    return percentages;
  },

  countOwnerWithMostDevices() {
    let owners = {};
    deviceManager.getAllDevices().forEach((device) => {
      if (device.owner in owners) {
        owners[device.owner]++;
      } else {
        owners[device.owner] = 1;
      }
    });

    let maxOwner = "";
    let maxDevices = 0;
    for (let owner in owners) {
      if (owners[owner] > maxDevices) {
        maxDevices = owners[owner];
        maxOwner = owner;
      }
    }

    return { owner: maxOwner, devices: maxDevices };
  },
};
