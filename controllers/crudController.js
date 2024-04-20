const DeviceManager = require("../repository/deviceManager");
const PossibleBrands = require("../models/possibleBrands"); 
const PossibleTypes = require("../models/possibleType"); 

const brandsManager = new PossibleBrands(); 
const typesManager = new PossibleTypes(); 
const brands = brandsManager.getAllBrands(); 
const types = typesManager.getAllTypes(); 

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
    this.validateData(device);
    const updatedDevice = deviceManager.updateDevice(device);
    return updatedDevice ? updatedDevice : "Device not found";
  },
  addDevice: function (device) {   
    this.validateData(device);
    return deviceManager.addDevice(device);
  },
  deleteDeviceById: function (id) {
    const deletedDevice = deviceManager.deleteDeviceById(id);
    return deletedDevice ? deletedDevice : "Device not found";
  },
  validateData: function(device){
    console.log(device);
    if (device.getCategory().toLowerCase() !== "electronics" && device.getCategory().toLowerCase() !== "appliances" && device.getCategory().toLowerCase() !== "equipment")
      throw new Error("Incorrect category");
    
    const validTypes = types[device.getCategory().toLowerCase()]; 
    if (!validTypes.includes(device.getType()))
      throw new Error("Incorrect Type for the device");

    const validBrands = brands[device.getCategory().toLowerCase()]; 
    if (!validBrands.includes(device.getBrand()))
      throw new Error("Incorrect Brand for the device");

    if (device.getDate() < "2000-01-01" || device.getDate() > new Date())
      throw new Error("Incorrect Date");
    
    return true;
  }
};
