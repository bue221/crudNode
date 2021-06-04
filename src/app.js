const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

// imports routes
const indexRoutes = require("./routes/index");

// connnection to db
mongoose
  .connect("mongodb://localhost/crudNotes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Conexion exitosa a la base de datos"))
  .catch((err) => console.log("@db", err));

// inicializacion de la app
const app = express();

//settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.set("models", path.join(__dirname + "/models"));
app.set("routes", path.join(__dirname + "/routes"));

//midelwares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//rutas
app.use("/", indexRoutes);

// ejecutar el servidor
app.listen(app.get("port"), () => {
  console.log(`Server run on port http://localhost:${app.get("port")}`);
});
