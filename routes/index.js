var express = require('express');
var router = express.Router();
var db_helper = require("../database_utilities/db_helpers");
var http=require('http');
var patientData= require('../models/patient.js');
var schedData= require('../models/scheduleAppointment.js');
var prescriptionData= require('../models/updatePrescription.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//registers user data
router.get('/register', function(req, res, next){
    console.log('inside register');
    //  take data from http head how to get and parse data from post
    console.log('req query: '+req.query);
    //console.log('req params: '+req.params.pname);
    console.log('req body: '+req.body);
    var patient=patientData.patient_model(req.query.pname,req.query.dob,req.query.address,req.query.policy_number);
    db_helper.addPatient(patient,res);
});

router.post('/scheduleAppointment', function (req,res,next) {
  console.log(res.query);
  db_helper.scheduleAppointment(req.query,res);
});

router.get('/enterDoctorRoom', function (req,res,next) {
  console.log(res.query);

  db_helper.enterDoctorRoom(req.query.docID,req.query.patientID,res);
});

router.get('/exitDoctorRoom', function (req,res,next) {
    console.log(res.query);
    db_helper.exitDoctorRoom(req.query.docID,req.query.patientID,res);
});

router.get('/getExpectedWaitingTime', function (req,res,next) {
    console.log('inside expected waiting time');
    db_helper.getExpectedWaitingTime(req.query.policyno,res);
});

router.post('/savePrescription', function (req,res,next) {
  console.log('inside save prescription');
  var prescription = prescriptionData.updatePrescription_model(req.query.policyno,req.query.med,req.query.exercise);
  db_helper.savePrescription(prescription,res);
});

router.get('/getPrescription', function (req,res,next) {
    console.log('inside get doc list');
    db_helper.getPrescription(req.query.policyno,res);
});


router.get('/getDoctorList', function (req,res,next) {
  console.log('inside get doc list');
  db_helper.getDoctorList(res);
});


router.get('/getAvailablility', function (req,res,next) {
    console.log('inside get availability');
    db_helper.getAppointement(req.query.docID,res);
});


module.exports = router;
