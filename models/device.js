class Device {
  constructor(id, category, type, brand, owner, accessories, warranty, date) {
    this.id = id;
    this.category = category;
    this.type = type;
    this.brand = brand;
    this.owner = owner;
    this.accessories = accessories;
    this.warranty = warranty;
    this.date = date;
  }

  getId() {
    return this.id;
  }
  getCategory() {
    return this.category;
  }

  getType() {
    return this.type;
  }

  getBrand() {
    return this.brand;
  }

  getOwner() {
    return this.owner;
  }

  getAccessories() {
    return this.accessories;
  }

  getWarranty() {
    return this.warranty;
  }

  getDate() {
    return this.date;
  }

  setId(id) {
    this.id = id;
  }
  setCategory(category) {
    this.category = category;
  }
  setType(type) {
    this.type = type;
  }

  setBrand(brand) {
    this.brand = brand;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setAccessories(accessories) {
    this.accessories = accessories;
  }

  setWarranty(warranty) {
    this.warranty = warranty;
  }

  setDate(date) {
    this.date = date;
  }
}

module.exports = Device;
