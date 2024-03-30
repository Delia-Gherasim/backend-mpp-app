const Device = require("./device");

class DeviceManager {
  constructor() {
    this.devices = [
      new Device(
        1,
        "electronics",
        "Smartphone",
        "Samsung",
        "John Doe",
        true,
        true,
        new Date("2022-03-31")
      ),
      new Device(
        2,
        "electronics",
        "Laptop",
        "Apple",
        "John Doe",
        false,
        false,
        new Date("2022-04-01")
      ),
      new Device(
        3,
        "electronics",
        "Tablet",
        "Google",
        "John Doe",
        true,
        true,
        new Date("2022-04-02")
      ),
      new Device(
        4,
        "electronics",
        "Smartwatch",
        "Fitbit",
        "Emily Brown",
        true,
        true,
        new Date("2022-04-03")
      ),
      new Device(
        5,
        "electronics",
        "Computer",
        "Dell",
        "Michael Davis",
        true,
        false,
        new Date("2022-04-04")
      ),
      new Device(
        6,
        "electronics",
        "Tv",
        "LG",
        "Sarah Wilson",
        false,
        true,
        new Date("2022-04-05")
      ),
      new Device(
        7,
        "electronics",
        "Camera",
        "Nikon",
        "David Martinez",
        true,
        true,
        new Date("2022-04-06")
      ),
      new Device(
        8,
        "electronics",
        "Gaming Console",
        "Sony",
        "Jessica Lee",
        true,
        false,
        new Date("2022-04-07")
      ),
      new Device(
        9,
        "electronics",
        "Headphones",
        "Bose",
        "Chris Taylor",
        false,
        true,
        new Date("2022-04-08")
      ),
      new Device(
        10,
        "electronics",
        "Fitness Tracker",
        "Garmin",
        "Emma Anderson",
        true,
        true,
        new Date("2022-04-09")
      ),
      new Device(
        11,
        "electronics",
        "Portable Speaker",
        "JBL",
        "Daniel Clark",
        false,
        false,
        new Date("2022-04-10")
      ),
      new Device(
        12,
        "electronics",
        "E-reader",
        "Amazon",
        "Olivia White",
        true,
        true,
        new Date("2022-04-11")
      ),
      new Device(
        13,
        "electronics",
        "Smart Home Hub",
        "Google",
        "William Turner",
        true,
        true,
        new Date("2022-04-12")
      ),
      new Device(
        14,
        "electronics",
        "VR Headset",
        "Oculus",
        "Sophia Garcia",
        false,
        true,
        new Date("2022-04-13")
      ),
      new Device(
        15,
        "electronics",
        "Router",
        "Linksys",
        "Ethan Moore",
        true,
        false,
        new Date("2022-04-14")
      ),
      new Device(
        16,
        "appliances",
        "Smart Thermostat",
        "Ecobee",
        "Mia Wilson",
        false,
        true,
        new Date("2022-04-15")
      ),
      new Device(
        17,
        "electronics",
        "Drone",
        "DJI",
        "Noah Thomas",
        true,
        true,
        new Date("2022-04-16")
      ),
      new Device(
        18,
        "appliances",
        "Smart Lock",
        "August",
        "Ava Johnson",
        false,
        false,
        new Date("2022-04-17")
      ),
      new Device(
        19,
        "electronics",
        "Camera",
        "Sony",
        "Liam Rodriguez",
        true,
        true,
        new Date("2022-04-18")
      ),
      new Device(
        20,
        "electronics",
        "Wireless Earbuds",
        "Apple",
        "Harper Martinez",
        false,
        true,
        new Date("2022-04-19")
      ),
      new Device(
        21,
        "electronics",
        "Digital Voice Assistant",
        "Amazon",
        "Evelyn Brown",
        true,
        false,
        new Date("2022-04-20")
      ),
      new Device(
        22,
        "electronics",
        "Tv",
        "LG",
        "Lucas Anderson",
        true,
        true,
        new Date("2022-04-21")
      ),
      new Device(
        23,
        "electronics",
        "Camera",
        "GoPro",
        "Aiden Taylor",
        false,
        false,
        new Date("2022-04-22")
      ),
      new Device(
        24,
        "appliances",
        "Vacuum",
        "Dyson",
        "Mila Moore",
        true,
        true,
        new Date("2022-04-23")
      ),
    ];
  }
  getNewId() {
    const lastElement = this.devices[this.devices.length - 1];
    return lastElement.getId() + 1;
  }
  getAllDevices() {
    return this.devices;
  }
  checkExistence(item) {
    return this.devices.find(
      (device) =>
        device.date === item.date &&
        device.category === item.category &&
        device.brand === item.brand &&
        device.type === item.type &&
        device.accessories === item.accessories &&
        device.warranty === item.warranty
    );
  }
  addDevice(newDevice) {
    const existingDevice = this.checkExistence(newDevice);
    if (existingDevice) {
      return "Device already exists";
    }
    newDevice.setId(this.getNewId());
    this.devices.push(newDevice);
    return newDevice;
  }

  deleteDeviceById(id) {
    const existingDevice = this.getDeviceById(id);
    if (!existingDevice) {
      return "Device doesn't exist";
    }
    this.devices = this.devices.filter((item) => item.id !== id);
    return "All ok";
  }
  updateDevice(newDevice) {
    let index = this.devices.findIndex((item) => item.id == newDevice.id);
    if (index !== -1) {
      this.devices[index] = newDevice;
      return "All ok";
    }
    return "Device doesn't exist";
  }

  getDeviceById(id) {
    let index = this.devices.findIndex((item) => item.id == id);
    if (index !== -1) {
      return this.devices[index];
    }
  }
}

module.exports = DeviceManager;
