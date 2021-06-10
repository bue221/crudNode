const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// vistas
router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log(task);
    res.render("forms", { task });
  } catch (error) {
    console.log(error);
  }
});

router.get("/home", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.render("index", { tasks });
  } catch (error) {
    console.log(error);
  }
});

// metodos CRUD
router.post("/add", (req, res) => {
  const { titulo, descripcion } = req.body;

  const task = new Task({ title: titulo, description: descripcion });

  task
    .save()
    .then((respuesta) => {
      // console.log("Buena la guarde", respuesta);
      res.redirect("/home");
    })
    .catch((err) => console.log("La mala no funciono", err));
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

router.get("/done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Task.findById(id);
    const task = await Task.updateOne(
      { _id: id },
      { $set: { status: !status.status } },
      { upsert: true }
    );
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    await Task.updateOne(
      { _id: id },
      { $set: { title: titulo, description: descripcion } },
      { upsert: true }
    );
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
