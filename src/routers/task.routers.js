const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var Model = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Model.Task.find();
  res.json(tasks);
});
router.get("/:id", async (req, res) => {
  const task = await Model.Task.findById(req.params.id);
  res.json(task);
});

router.post("/", (req, res) => {
  console.log("El id es: ", req.body.body._id);
  let id = "" + req.body.body._id;
  let task = new Model.Task({
    title: req.body.body.title,
    description: req.body.body.description
  });
  if (id.length < 12) {
    id = mongoose.Types.ObjectId();
  }
  Model.Task.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { title: req.body.body.title, description: req.body.body.description },
    {
      upsert: true
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
    }
  );
  console.log(task);
  //task.save();
  res.json({ status: "Task Save", data: { id: task._id } });
});

router.put("/:id", async (req, res) => {
  console.log(req);
  await res.json({ status: "Task Updated" });
});
router.delete("/:id", async (req, res) => {
  await Model.Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Deleted" });
});

module.exports = router;
