const Device = require("../models/device");
const { ObjectId } = require("mongodb");
const client = require("../mongoClient");
class DeviceManager {
  constructor() {
    this.collection = client.db("mpp").collection("devices");
  }
  async getAllDevices() {
    try {
      const devices = await this.collection.find({}).toArray();
      if (!devices) {
        throw new Error("No data received from collection.find");
      }

      // console.log("Devices fetched:", devices);
      const transformedDevices = this.transformToDeviceArray(devices);

      // console.log("Transformed devices:", transformedDevices);
      return transformedDevices;
    } catch (error) {
      console.error("Error in getAllDevices:", error);
      throw error;
    }
  }
  transformToDeviceArray(rawData) {
    if (!Array.isArray(rawData)) {
      //console.error("transformToDeviceArray received non-array input:", rawData);
      throw new Error("Input data must be an array.");
    }

    const deviceArray = rawData.map((deviceData) => {
      const { id, category, type, brand, owner, accessories, warranty, date } =
        deviceData;
      return new Device(
        id,
        category,
        type,
        brand,
        owner,
        accessories,
        warranty,
        date
      );
    });
    return deviceArray;
  }
  async getNewId() {
    const lastDevice = await this.collection.findOne({}, { sort: { _id: -1 } });
    if (lastDevice) {
      return lastDevice._id + 1;
    } else {
      return 1;
    }
  }
  async checkExistence(item) {
    return await this.collection.findOne({
      name: item.name,
      surname: item.surname,
      phoneNumber: item.phoneNumber,
      email: item.email,
    });
  }
  async addDevice(newDevice) {
    try {
      await this.collection.insertOne(newDevice);
      return newDevice;
    } catch (error) {
      if (error.code === 11000) {
        console.log("Duplicate key error. Generating a new _id value.");
        newDevice._id = new ObjectId();
        return await this.addClient(newDevice);
      } else {
        throw error;
      }
    }
  }
  async getDeviceById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      const deviceData = await this.collection.findOne({ id: id });

      if (!deviceData) {
        throw new Error("Device not found.");
      }
      const { category, type, brand, owner, accessories, warranty, date } =
        deviceData;
      return new Device(
        id,
        category,
        type,
        brand,
        owner,
        accessories,
        warranty,
        date
      );
    } catch (error) {
      console.error("Error in getDeviceById:", error);
      throw new Error("Failed to fetch device: " + error.message);
    }
  }
  async deleteDeviceById(id) {
    const result = await this.collection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return "Device deleted successfully";
    }
    return "Device not found";
  }
  async updateDevice(updatedDevice) {
    try {
      console.log("Updating device with data:", updatedDevice);
      const filter = { id: updatedDevice.id };

      const replacement = {
        id: updatedDevice.id,
        category: updatedDevice.category,
        type: updatedDevice.type,
        brand: updatedDevice.brand,
        owner: updatedDevice.owner,
        accessories: updatedDevice.accessories,
        warranty: updatedDevice.warranty,
        date: updatedDevice.date,
      };

      const result = await this.collection.replaceOne(filter, replacement);
      console.log("ReplaceOne result:", result);

      if (result.matchedCount === 1) {
        return "Device updated successfully";
      } else {
        return "Device not found";
      }
    } catch (error) {
      console.error("Error updating device:", error);
      throw new Error("Error updating device: " + error.message);
    }
  }
  async getDevicesByOwner(ownerName) {
    try {
      const devices = await this.collection.find({ owner: new RegExp(`^${ownerName}$`, 'i') });
      return devices;
    } catch (error) {
      throw new Error("Error retrieving devices by owner: " + error.message);
    }
  }
}

module.exports = DeviceManager;
