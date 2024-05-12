const User = require("../models/user");
const { ObjectId } = require("mongodb");
const client = require("../mongoClient");

class UserManager {
  constructor() {
    this.collection = client.db("mpp").collection("users");
  }

  async getUserById(idToCheck) {
    try {
      const userData = await this.collection.findOne({ id: idToCheck });
      if (!userData) {
        throw new Error("User not found.");
      }

      const { id, name, surname, password, email, position } = userData;
      return new User(id, name, surname, password, email, position);
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw new Error("Failed to fetch user: " + error.message);
    }
  }

  async getUserByEmail(_email, _password) {
    try {
      const query = {
        email: _email ? _email.trim() : null,
        password: _password ? _password.trim() : null,
      };
      const userData = await this.collection.findOne(query);
      if (!userData) {
        throw new Error("User not found.");
      }

      const { id, name, surname, password, email, position } = userData;
      return new User(id, name, surname, password, email, position);
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw new Error("Failed to fetch user: " + error.message);
    }
  }

  async getNewId() {
    const lastClient = await this.collection.findOne({}, { sort: { _id: -1 } });
    if (lastClient) {
      return lastClient._id + 1;
    } else {
      return 1;
    }
  }

  async checkExistence(item) {
    const query = {
      name: item.name ? item.name.trim() : null,
      surname: item.surname ? item.surname.trim() : null,
      email: item.email ? item.email.trim() : null,
    };

    const userData = await this.collection.findOne(query);
    if (userData) {
      const { id, name, surname, password, email, position } = userData;
      return new User(id, name, surname, password, email, position);
    }
    return false;
  }

  async addUser(newUser) {
    try {
      if (!newUser.name || !newUser.surname || !newUser.password || !newUser.email || !newUser.position) {
        console.log("required fields");
        throw new Error("Missing required fields for user.");
      }
      newUser.id = await this.getNewId();
      console.log(newUser.id);
      await this.collection.insertOne(newUser);
      console.log("plm");
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id) {
    const result = await this.collection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return "User deleted successfully";
    }
    return "User not found";
  }

  async updateUser(updatedUser) {
    try {
      console.log("Updating user with data:", updatedUser);
      const filter = { id: updatedUser.id };

      const replacement = {
        id: updatedUser.id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        password: updatedUser.password,
        email: updatedUser.email,
        position: updatedUser.position,
      };

      const result = await this.collection.replaceOne(filter, replacement);
      console.log("ReplaceOne result:", result);

      if (result.matchedCount === 1) {
        return "User updated successfully";
      } else {
        return "User not found";
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user: " + error.message);
    }
  }

 
}

module.exports = UserManager;
