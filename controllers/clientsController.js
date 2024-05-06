const ClientsManager = require("../repository/clientManager");
const clientManager = new ClientsManager();
const DeviceManager = require("../repository/deviceManager");
const deviceManager = new DeviceManager();

module.exports = {
  totalNumberOfItems: async function () {
    const clients = await clientManager.getAllClients();
    return clients.length;
  },
  getPagesOfNItems: async function (numberOfItems, pageNumber) {
    const clients = await clientManager.getAllClients();
    
    const startIndex = (pageNumber - 1) * numberOfItems;
    const endIndex = pageNumber * numberOfItems;
    const totalPages = Math.ceil(clients.length / numberOfItems);
    const currentPage = pageNumber;

    const itemsForCurrentPage = clients.slice(startIndex, endIndex); 

    return {
      totalItems: clients.length,
      totalPages: totalPages,
      currentPage: currentPage,
      items: itemsForCurrentPage,
    };
  },
  updatePaginationData: async function () {
    const totalItems = await this.totalNumberOfItems(); 
    const totalPages = Math.ceil(totalItems / 10);
    return {
      totalItems: totalItems,
      totalPages: totalPages,
    };
  },
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
      await this.validateData(client);
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
  getAllClientData: async function(client){
    try {
      const actualClient = await clientManager.checkExistence(client);
      if (!actualClient) {
        throw new Error("Client does not exist");
      }
    }catch (error) {
      throw new Error("Error fetching devices for client: " + error.message);
    }

    return actualClient;
  },
  getDevicesOfClient: async function (client) {
    try {
      const actualClient = await clientManager.checkExistence(client);
      if (!actualClient) {
        throw new Error("Client does not exist");
      }
      const clientFullName = `${actualClient.getName().trim()} ${actualClient
        .getSurname()
        .trim()}`.toLowerCase();

      const allDevices = await deviceManager.getAllDevices();
      const devicesOfClient = allDevices.filter(
        (device) => device.getOwner().toLowerCase().trim() == clientFullName
      );

      if (devicesOfClient.length > 0) {
        return devicesOfClient;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error fetching devices for client: " + error.message);
    }
  },
};
