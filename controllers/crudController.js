const DeviceManager = require("../models/deviceManager");

const deviceManager = new DeviceManager();

module.exports = {
  getAll: function () {
    const devices = deviceManager.getAllDevices();
    return devices;
  },
  getDeviceById: function (id) {
    const device = deviceManager.getDeviceById(id);
    return device ? device : "Device not found";
  },
  updateDevice: function (device) {
    const updatedDevice = deviceManager.updateDevice(device);
    return updatedDevice ? updatedDevice : "Device not found";
  },
  addDevice: function (device) {
    return deviceManager.addDevice(device);
  },
  deleteDeviceById: function (id) {
    const deletedDevice = deviceManager.deleteDeviceById(id);
    return deletedDevice ? deletedDevice : "Device not found";
  },
};
