var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = require('../app');


router.get('/', (req, res, next) => {
    const collection = req.app.locals[config.dbCollection];
    collection.find({}).toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
    });


router.post('/', (req, res, next) => 
    {
        const {appointmentDate, name, email} = req.body;
        const appointment =  {appointmentDate, name, email};
        const collection = req.app.locals[config.dbCollection];
        if(!appointmentDate || !name || !email) {
            return res.status(400).json({
                message:'All fields are required'
            });
        }
        else
        {
            try
            {
                collection.insertOne({appointment});
                const result = res.status(200).json(appointment);
                res.send(result + 
                'Appointment created successfully');
            } 
            catch
            {
                (error => res.send(error));
            }
        }
    });


 router.delete('/', (req,res,next  ) => {
    const collection = req.app.locals[config.dbCollection];
    collection.remove({})
        .then(result => res.json(result))
        .catch(error => res.send(error));
  }); 

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    const _id = ObjectId(id);
    const collection = req.app.locals[config.dbCollection];
    collection.deleteOne({_id})
    .then(result => res.json(result))
    .catch(error => res.send(error));
    
    
});
module.exports = router; 