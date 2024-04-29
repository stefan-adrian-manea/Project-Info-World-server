const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clients.controller");

router.get("/", clientsController.getAllClients);
router.get("/:id", clientsController.getClientById);
router.post("/", clientsController.addClient);
router.put("/:id", clientsController.updateClient);
router.delete("/:id", clientsController.deleteClient);
router.get("/checkDuplicateEmail", clientsController.checkDuplicateEmail);

module.exports = router;
