const ClientsManager = require("../repository/clientManager");
const clientManager = new ClientsManager();

module.exports = {
  getAll: async function () {
    try {
      const clients = await clientManager.getAllClients();
      return clients;
    } catch (error) {
      throw new Error("Error fetching clients: " + error.message);
    }
  },

  getClientById: async function (id) {
    try {
      const client = await clientManager.getClientById(id);
      return client ? client : "Client not found";
    } catch (error) {
      throw new Error("Error fetching client by ID: " + error.message);
    }
  },

  updateClient: async function (client) {
    try {
      await this.validateData(client);
      const updatedClient = await clientManager.updateClient(client);
      return updatedClient ? updatedClient : "Client not found";
    } catch (error) {
      throw new Error("Error updating client: " + error.message);
    }
  },

  addClient: async function (client) {
    try {
      await this.validateData(client); // Validate data
      const addedClient = await clientManager.addClient(client);
      return addedClient;
    } catch (error) {
      throw new Error("Error adding client: " + error.message);
    }
  },

  deleteClientById: async function (id) {
    try {
      const deletedClient = await clientManager.deleteClientById(id);
      return deletedClient ? deletedClient : "Client not found";
    } catch (error) {
      throw new Error("Error deleting client: " + error.message);
    }
  },

  validateData: function (client) {
    if (!client.getName().trim()) {
      throw new Error("Name cannot be empty");
    }
    if (!client.getSurname().trim()) {
      throw new Error("Surname cannot be empty");
    }

    return true;
  },
};
