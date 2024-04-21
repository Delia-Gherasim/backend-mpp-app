const Client = require("../models/client");
const { ObjectId } = require("mongodb");
const client = require("../mongoClient");
class ClientManager {
  constructor() {
    this.collection = client.db("mpp").collection("clients");
  }
  async getAllClients() {
    try {
      const clients = await this.collection.find({}).toArray();
      if (!clients) {
        throw new Error("No data received from collection.find");
      }

     // console.log("Clients fetched:", clients); 
      const transformedClients = this.transformToClientArray(clients);

     // console.log("Transformed clients:", transformedClients); 

      return transformedClients;
    } catch (error) {
      console.error("Error in getAllClients:", error);
      throw error; 
    }
  }
  async getClientById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      const clientData = await this.collection.findOne({ id: id });
      if (!clientData) {
        throw new Error("Client not found.");
      }

      const { name, surname, phoneNumber, email, debt, extraDetails } = clientData;
      return new Client(id, name, surname, phoneNumber, email, debt, extraDetails);
    } catch (error) {
      console.error("Error in getClientById:", error);
      throw new Error("Failed to fetch client: " + error.message);
    }
  }


  transformToClientArray(rawData) {
    if (!Array.isArray(rawData)) {
      //console.error("transformToClientArray received non-array input:", rawData);
      throw new Error("Input data must be an array.");
    }

    const clientArray = rawData.map((clientData) => {
      const { id, name,surname, phoneNumber, email, debt, extraDetails } =
        clientData;
      return new Client(
        id,
        name,
        surname,
        phoneNumber,
        email,
        debt,
        extraDetails
      );
    });
    return clientArray;
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
    return await this.collection.findOne({
      name: item.name,
      surname: item.surname,
      phoneNumber: item.phoneNumber,
      email: item.email,
    });
  }
  async addClient(newClient) {
    try {
      await this.collection.insertOne(newClient);
      return newClient;
    } catch (error) {
      if (error.code === 11000) {
        console.log("Duplicate key error. Generating a new _id value.");
        newClient._id = new ObjectId();
        return await this.addClient(newClient);
      } else {
        throw error;
      }
    }
  }
  async deleteClientById(id) {
    const result = await this.collection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return "Client deleted successfully";
    }
    return "Client not found";
  }
  async updateClient(updatedClient) {
    try {
      console.log("Updating client with data:", updatedClient);
      const filter = { id: updatedClient.id }; 
  
      const replacement = {
        id: updatedClient.id, 
        name: updatedClient.name,
        surname: updatedClient.surname,
        phoneNumber: updatedClient.phoneNumber,
        email: updatedClient.email,
        debt: updatedClient.debt,
        extraDetails: updatedClient.extraDetails,
      };
  
      const result = await this.collection.replaceOne(filter, replacement);
      console.log("ReplaceOne result:", result);
  
      if (result.matchedCount === 1) { 
        return "Client updated successfully"; 
      } else {
        return "Client not found"; 
      }
    } catch (error) {
      console.error("Error updating client:", error); 
      throw new Error("Error updating client: " + error.message); 
    }
  }
  
}


module.exports = ClientManager;

