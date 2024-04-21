const DeviceManager = require("../repository/deviceManager");
const PossibleBrands = require("../models/possibleBrands"); 
const PossibleTypes = require("../models/possibleType"); 

const brandsManager = new PossibleBrands(); 
const typesManager = new PossibleTypes(); 
const brands = brandsManager.getAllBrands(); 
const types = typesManager.getAllTypes(); 

const deviceManager = new DeviceManager();

module.exports = {
  getAll: async function () {
    try {
      const devices = await deviceManager.getAllDevices(); 
      return devices;
    } catch (error) {
      throw new Error("Error fetching devices: " + error.message); 
    }
  },

  getDeviceById: async function (id) {
    try {
      const device = await deviceManager.getDeviceById(id); 
      return device ? device : "Device not found";
    } catch (error) {
      throw new Error("Error fetching device by ID: " + error.message); 
    }
  },

  updateDevice: async function (device) {
    try {
      await this.validateData(device); 
      const updatedDevice = await deviceManager.updateDevice(device); 
      return updatedDevice ? updatedDevice : "Device not found";
    } catch (error) {
      throw new Error("Error updating device: " + error.message); 
    }
  },

  addDevice: async function (device) {
    try {
      await this.validateData(device);
      const addedDevice = await deviceManager.addDevice(device); 
      return addedDevice;
    } catch (error) {
      throw new Error("Error adding device: " + error.message); 
    }
  },

  deleteDeviceById: async function (id) {
    try {
      const deletedDevice = await deviceManager.deleteDeviceById(id); 
      return deletedDevice ? deletedDevice : "Device not found";
    } catch (error) {
      throw new Error("Error deleting device: " + error.message); 
    }
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
