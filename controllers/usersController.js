const UserManager = require("../repository/userManager");

const userManager = new UserManager();

module.exports = {
  getAll: async function () {
    try {
      const users = await userManager.getAllUsers();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  },
  checkLogIn: async function (user) {
    try {
      const verifiedUser = await userManager.checkLogIn(user);
      return verifiedUser ? verifiedUser : "User not found";
    } catch (error) {
      throw new Error("Error veryfing user: " + error.message);
    }
  },

  getUserById: async function (id) {
    try {
      const user = await userManager.getUserById(id);
      return user ? user : "User not found";
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },

  updateUser: async function (user) {
    try {
      await this.validateData(user);
      const updatedUser = await userManager.updateUser(user);
      return updatedUser ? updatedUser : "User not found";
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  addUser: async function (user) {
    try {
      await this.validateData(user);
      const addedUser = await userManager.addUser(user);
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

    return true;
  },
};
