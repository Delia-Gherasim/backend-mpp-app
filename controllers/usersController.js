const UserManager = require("../repository/userManager");

const userManager = new UserManager();

module.exports = {
  getUserById: async function (id) {
    try {
      const user = await userManager.getUserById(id);
      return user ? user : "User not found";
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },
  getUserByEmail: async function(email, password){
    try {
      const user = await userManager.getUserByEmail(email, password);
      return user ? user : "User not found";
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },
  updateUser: async function (user) {
    try {
      const updatedUser = await userManager.updateUser(user);
      return updatedUser ? updatedUser : "User not found";
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  addUser: async function (user) {
    try {
      const addedUser = await userManager.addUser(user);
      console.log("added user");
      return addedUser;
    } catch (error) {
      throw new Error("Error adding user: " + error.message);
    }
  },

  deleteUserById: async function (id) {
    try {
      const deletedUser = await userManager.deleteUserById(id);
      return deletedUser ? deletedUser : "User not found";
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  },

  validateData: function (user) {
    if (!user.getName().trim()) {
      throw new Error("Name cannot be empty");
    }
    if (!user.getSurname().trim()) {
      throw new Error("Surname cannot be empty");
    }
    if (!user.getEmail().trim()) {
      throw new Error("Email cannot be empty");
    }
    if (!user.getPassword().trim()) {
      throw new Error("Password cannot be empty");
    }
    return true;
  },
};
