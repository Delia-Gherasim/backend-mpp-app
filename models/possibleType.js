class PossibleTypes {
  constructor() {
    this.typesOfElectronics = [
      "Smartphone",
      "Laptop",
      "Tablet",
      "Smartwatch",
      "Desktop Computer",
      "Monitor",
      "Keyboard",
      "Mouse",
      "TV",
      "Video Camera",
      "Photo Camera",
      "Gaming Console",
      "Gaming Controller",
      "Portable Speaker",
      "Headphones",
      "Wireless Earbuds",
      "Fitness Tracker",
      "E-reader",
      "Smart Home Hub",
      "Digital Voice Assistant",
      "VR Headset",
      "Router",
      "Drone",
      "Smart Lock",
    ];

    this.typesOfAppliances = [
      "Refrigerator",
      "Washing Machine",
      "Dishwasher",
      "Microwave Oven",
      "Vacuum Cleaner",
      "Air Conditioner",
      "Coffee Maker",
      "Toaster",
      "Blender",
      "Food Processor",
      "Electric Kettle",
      "Oven",
      "Stove",
      "Juicer",
      "Rice Cooker",
      "Deep Fryer",
      "Slow Cooker",
      "Water Heater",
      "Iron",
      "Fan",
    ];

    this.typesOfEquipment = [
      "Power Tools",
      "Lighting Fixtures",
      "Heating Systems",
      "Fans",
      "Electrical Wiring",
      "Circuit Breakers",
      "Electrical Outlets",
      "Generators",
      "Solar Panels",
      "Wind Turbines",
      "Industrial Robots",
      "Conveyor Systems",
      "Industrial Machinery",
      "CNC Machines",
      "3D Printers",
      "Injection Molding Machines",
      "Assembly Lines",
    ];
  }

  getAllTypes() {
    return {
      electronics: this.typesOfElectronics,
      appliances: this.typesOfAppliances,
      equipment: this.typesOfEquipment,
    };
  }

  getAllTypesForCategory(category) {
    if (category.toLowerCase() === "equipment") {
      return this.equipment;
    } else if (category.toLowerCase() === "electronics") {
      return this.electronics;
    } else if (category.toLowerCase() === "appliances") {
      return this.appliances;
    } else return {};
  }
  addTypeForCategory(category, newType) {
    if (category.toLowerCase() === "equipment") {
      if (!this.typesOfEquipment.find(newType))
        this.typesOfEquipment.push(newType);
    } else if (category.toLowerCase() === "electronics") {
      if (!this.typesOfElectronics.find(newType))
        this.typesOfElectronics.push(newType);
    } else if (category.toLowerCase() === "appliances") {
      if (!this.typesOfAppliances.find(newType))
        this.typesOfAppliances.push(newType);
    }
  }
}

module.exports = PossibleTypes;
