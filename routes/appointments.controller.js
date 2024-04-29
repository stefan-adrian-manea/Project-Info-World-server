const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointments.controller");

router.get("/", appointmentsController.getAllAppointments);
router.get("/:id", appointmentsController.getAppointmentById);
router.post("/", appointmentsController.addAppointment);
router.put("/:id", appointmentsController.updateAppointment);

module.exports = router;
