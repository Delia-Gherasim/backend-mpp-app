const typesManager = require("../models/possibleType");

const types = new typesManager();

module.exports = {
  getAll: function () {
    const typesList = types.getAllTypes();
    return typesList;
  },
  getAllByCategory: function (category) {
    return types.getAllTypesForCategory(category);
  },
  addTypeForCategory: function (category, type) {
    return types.addTypeForCategory(category, type);
  },
};
