const UserManager = require("../repository/userManager");

const userManager = new UserManager();

module.exports = {
  getUserById: async function (_id) {
    try {
      const user = await userManager.getUserById(_id);
      return user ? user : "User not found";
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },
  getUserByEmail: async function(_email, _password){
    try {
      const user = await userManager.getUserByEmail(_email, _password);
      return user ? user : "User not found";
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },
  updateUser: async function (_user) {
    try {
      const updatedUser = await userManager.updateUser(_user);
      return updatedUser ? updatedUser : "User not found";
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  addUser: async function (_user) {
    try {
      const addedUser = await userManager.addUser(_user);
      console.log("added user");
      return addedUser;
    } catch (error) {
      throw new Error("Error adding user: " + error.message);
    }
  },

  deleteUserById: async function (_id) {
    try {
      const deletedUser = await userManager.deleteUserById(_id);
      return deletedUser ? deletedUser : "User not found";
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  },

  validateData: function (_user) {
    if (
      _user.getPosition().toLowerCase() !== "user" &&
      _user.getPosition().toLowerCase() !== "manager" &&
      _user.getPosition().toLowerCase() !== "admin"
    ){
      throw new Error("Incorrect position");
    }
    if (!_user.getName().trim()) {
      throw new Error("Name cannot be empty");
    }
    if (!_user.getSurname().trim()) {
      throw new Error("Surname cannot be empty");
    }
    if (!_user.getEmail().trim()) {
      throw new Error("Email cannot be empty");
    }
    if (!_user.getPassword().trim()) {
      throw new Error("Password cannot be empty");
    }
    return true;
  },

  getDevicesOfUser: async function(_user){
    try {
      const actualUser = await userManager.checkExistence(_user);
      if (!actualUser) {
        throw new Error("User does not exist");
      }
      const devices = await deviceManager.getDevicesOfUser(_user);
      if (devices.length > 0) {
        return devices;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error fetching devices for user: " + error.message);
    }
  },
};
