const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const clientsRoutes = require("./routes/clients.controller");
const appointmentsRoutes = require("./routes/appointments.controller");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

app.use("/clients", clientsRoutes);
app.use("/appointments", appointmentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
