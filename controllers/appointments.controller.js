const { loadData, saveData } = require("../fileUtils");

function getAllAppointments(req, res) {
  const data = loadData();
  res.json(data.appointments);
}

function getAppointmentById(req, res) {
  const appointmentId = req.params.id;
  const data = loadData();
  const appointment = data.appointments.find((appointment) => appointment.id === appointmentId);
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).json({ message: "Appointment not found" });
  }
}

function addAppointment(req, res) {
  const newAppointment = req.body;
  newAppointment.id = generateAppointmentId();
  const data = loadData();
  data.appointments.push(newAppointment);
  saveData(data);
  res.json({ message: "Appointment added successfully", appointment: newAppointment });
}

function updateAppointment(req, res) {
  const appointmentId = req.params.id;
  const updatedAppointmentData = req.body;
  const data = loadData();
  const index = data.appointments.findIndex((appointment) => appointment.id === appointmentId);
  if (index !== -1) {
    data.appointments[index] = { ...data.appointments[index], ...updatedAppointmentData };
    saveData(data);
    res.json({
      message: "Appointment updated successfully",
      appointment: data.appointments[index],
    });
  } else {
    res.status(404).json({ message: "Appointment not found" });
  }
}

function generateAppointmentId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = { getAllAppointments, getAppointmentById, addAppointment, updateAppointment };
