const brandsManager = require("../models/possibleBrands");

const items = new brandsManager();

module.exports = {
  getAll: function () {
    const brandsList = items.getAllBrands();
    return brandsList;
  },
  getAllByCategory: function (category) {
    return items.getAllBrandsForCategory(category);
  },
  addBrandForCategory: function (category, brand) {
    return items.addBrandForCategory(category, brand);
  },
};
