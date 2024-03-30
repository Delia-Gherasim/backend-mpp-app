class PossibleBrands {
  constructor() {
    this.brandsOfElectronics = [
      "Samsung",
      "Apple",
      "Sony",
      "LG",
      "Huawei",
      "Xiaomi",
      "Google",
      "Dell",
      "HP",
      "Microsoft",
      "Lenovo",
      "Asus",
      "Acer",
      "Toshiba",
      "Nokia",
      "OnePlus",
      "Motorola",
      "HTC",
      "BlackBerry",
      "Alcatel",
    ];
    this.brandsOfAppliances = [
      "Bosch",
      "Siemens",
      "Whirlpool",
      "Electrolux",
      "Miele",
      "Panasonic",
      "Haier",
      "Sharp",
      "Kenmore",
      "Frigidaire",
      "Indesit",
      "Hotpoint",
      "Zanussi",
      "Beko",
      "Samsung",
      "LG",
      "Breville",
      "De'Longhi",
      "Nespresso",
      "Tefal",
    ];
    this.brandsOfEquipment = [
      "Bosch Power Tools",
      "Siemens",
      "ABB",
      "Caterpillar",
      "Schneider Electric",
      "Emerson",
      "Hitachi",
      "Makita",
      "Honeywell",
      "3M",
      "Grundfos",
      "Danfoss",
      "ABB",
      "Eaton",
      "GE Industrial",
      "Rockwell Automation",
      "Yaskawa",
      "KUKA",
      "Festo",
    ];
  }

  getAllBrands() {
    return {
      electronics: this.brandsOfElectronics,
      appliances: this.brandsOfAppliances,
      equipment: this.brandsOfEquipment,
    };
  }

  getAllBrandsForCategory(category) {
    if (category.toLowerCase() === "electronics") {
      return this.brandsOfElectronics;
    } else if (category.toLowerCase() === "appliances") {
      return this.brandsOfAppliances;
    } else if (category.toLowerCase() === "equipment") {
      return this.brandsOfEquipment;
    } else {
      return {};
    }
  }

  addBrandForCategory(category, brand) {
    if (category === "electronics") {
      if (!this.brandsOfElectronics.find(brand)) {
        this.brandsOfElectronics.push(brand);
      }
    } else if (category === "appliances") {
      if (!this.brandsOfAppliances.find(brand)) {
        this.brandsOfAppliances.push(brand);
      }
    } else if (category === "equipment") {
      if (!this.brandsOfEquipment.find(brand)) {
        this.brandsOfEquipment.push(brand);
      }
    }
  }
}

module.exports = PossibleBrands;
