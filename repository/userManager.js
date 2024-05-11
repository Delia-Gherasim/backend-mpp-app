const User = require("../models/user");
const { ObjectId } = require("mongodb");
const client = require("../mongoClient");

class UserManager {
  constructor() {
    this.collection = client.db("mpp").collection("users");
  }
  async getAllUsers() {
    try {
      const users = await this.collection.find({}).toArray();
      if (!users) {
        throw new Error("No data received from collection.find");
      }

      // console.log("Users fetched:", users);
      const transformedUsers = this.transformToUserArray(users);

      // console.log("Transformed users:", transformedUsers);

      return transformedUsers;
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
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

  transformToUserArray(rawData) {
    if (!Array.isArray(rawData)) {
      //console.error("transformToUserArray received non-array input:", rawData);
      throw new Error("Input data must be an array.");
    }

    const userArray = rawData.map((userData) => {
      const { id, name, surname, password, email, position } = userData;
      return new User(id, name, surname, password, email, position);
    });
    return userArray;
  }
  async getNewId() {
    const lastUser = await this.collection.findOne({}, { sort: { id: -1 } });
    if (lastUser) {
      return lastUser.id + 1;
    } else {
      return 1;
    }
  }
  async checkExistence(item) {
    const query = {
      name: item.name ? item.name.trim() : null,
      surname: item.surname ? item.surname.trim() : null,
    };

    if (item.email && item.email.trim().length > 0) {
      query.email = item.email.trim();
    }

    const userData = await this.collection.findOne(query);
    if (!userData) {
      throw new Error("User not found.");
    }
    const { id, name, surname, password, email, position } = userData;
    return new User(id, name, surname, password, email, position);
  }

  async addUser(newUser) {
    try {
      newUser.id = this.getNewId();
      await this.collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        console.log("Duplicate key error. Generating a new _id value.");
        newUser._id = new ObjectId();
        return await this.addUser(newUser);
      } else {
        throw error;
      }
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
  
  async checkLogIn(item) {
    try {
        const query = {
            id: item.id ? item.id.trim() : null,
            password: item.password ? item.password.trim() : null,
        };

        const userData = await this.collection.findOne(query);
        if (!userData) {
            throw new Error("Invalid credentials.");
        }

        return true;
    } catch (error) {
        console.error("Error in checkLogIn:", error);
        throw new Error("Login failed: " + error.message);
    }
}

}

module.exports = UserManager;
