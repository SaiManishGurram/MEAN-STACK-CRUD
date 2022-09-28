const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Employee } = require('../models/employee');

// => localhost:3000/employees/

//Get all employees
router.get('/all', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error in retrieving employees: ', JSON.stringify(err, undefined, 2));
        }
    });
});

//Get employee by id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        Employee.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log('Error in retrieving employee: ', JSON.stringify(err, undefined, 2));
            }
        })
    }
})

//Insert new employee
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log('Employee Save successfull');
        } else {
            console.log('Error in employee save: ', JSON.stringify(err, undefined, 2));
        }
    });
});

//update employee by id
router.put('/:id', (req,res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        var emp = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary,
        };
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err,doc)=>{
            if(!err) {
                res.send(doc);
            } else {
                console.log('Error in employee update: ', JSON.stringify(err, undefined, 2));
            }
        })
    }
})

//Delete employee by id
router.delete('/:id', (req,res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    } else {
        Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
            if(!err) {
                res.send(doc); 
            } else {
                console.log('Error in employee delete: ', JSON.stringify(err, undefined, 2));
            }
        })
    }
})

module.exports = router;