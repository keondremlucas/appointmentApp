var express = require("express");
var router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const config = require("../config");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const app = require("../app");
const { ObjectID } = require("bson");

//GET ALL APPOINTMENTS
router.get("/", (req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  collection
    .find({})
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});
//GET APPOINTMENT BY ID
router.get("/:id", (req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  const { id } = req.params;
  const _id = ObjectID(id);
  collection
    .find({ _id })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});
//CREATE A NEW APPOINTMENT
router.post("/", (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  const appointment = { appointmentDate, name, email };
  const collection = req.app.locals[config.dbCollection];
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: "All fields are required",
    });
  } else {
    try {
      collection.insertOne({ appointment });
      const result = res.status(200).json(appointment);
      res.send(result + "Appointment created successfully");
    } catch {
      (error) => res.send(error);
    }
  }
});
//UPDATE APPOINTMENT BY ID
router.patch("/:id/", (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectId(id);

  const appointmentDate = req.body.appointmentDate;
  const name = req.body.name;
  const email = req.body.email;
  const appointment = { appointmentDate, name, email };
  const collection = req.app.locals[config.dbCollection];
  try {
    if ((req.body.name = "" || req.body.name == null)) {
      collection.updateOne(
        { _id },
        {
          $set: {
            appointmentDate: req.body.appointmentDate,
            email: req.body.email,
          },
        }
      );
    } else if (
      (req.body.appointmentDate = "" || req.body.appointmentDate == null)
    ) {
      collection.updateOne(
        { _id },
        { $set: { name: req.body.name, email: req.body.email } }
      );
    } else if ((req.body.email = "" || req.body.email == null)) {
      collection.updateOne(
        { _id },
        {
          $set: {
            appointmentDate: req.body.appointmentDate,
            name: req.body.name,
          },
        }
      );
    } else {
      collection.updateOne({ _id }, { $set: { appointment } });
    }
    const result = res.status(200).json(appointment);
    res.send(result);
  } catch {
    (error) => res.send(error);
  }
});
//DELETE ALL
router.delete("/", (req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  collection
    .remove({})
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});
//DELETE APPOINTMENT BY ID
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  const collection = req.app.locals[config.dbCollection];
  collection
    .deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

module.exports = router;
