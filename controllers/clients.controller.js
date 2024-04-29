const { loadData, saveData } = require("../fileUtils");

function getAllClients(req, res) {
  const data = loadData();
  res.json(data.clients);
}

function getClientById(req, res) {
  const clientId = req.params.id;
  const data = loadData();
  const client = data.clients.find((client) => client.id === clientId);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: "Client not found" });
  }
}

function addClient(req, res) {
  const newClient = req.body;
  newClient.id = generateClientId();
  const data = loadData();
  data.clients.push(newClient);
  saveData(data);
  res.json({ message: "Client added successfully", client: newClient });
}

function updateClient(req, res) {
  const clientId = req.params.id;
  const updatedClientData = req.body;
  const data = loadData();
  const index = data.clients.findIndex((client) => client.id === clientId);
  if (index !== -1) {
    data.clients[index] = { ...data.clients[index], ...updatedClientData };
    saveData(data);
    res.json({ message: "Client updated successfully", client: data.clients[index] });
  } else {
    res.status(404).json({ message: "Client not found" });
  }
}

function deleteClient(req, res) {
  const clientId = req.params.id;
  const data = loadData();
  const index = data.clients.findIndex((client) => client.id === clientId);
  if (index !== -1) {
    const deletedClient = data.clients.splice(index, 1);
    saveData(data);
    res.json({ message: "Client deleted successfully", client: deletedClient });
  } else {
    res.status(404).json({ message: "Client not found" });
  }
}

function checkDuplicateEmail(req, res) {
  const email = req.query.email;
  const data = loadData();
  const duplicate = data.clients.some((client) => client.email === email);
  res.json({ duplicate });
}

function generateClientId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
  checkDuplicateEmail,
};
