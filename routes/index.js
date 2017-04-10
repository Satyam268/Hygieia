var express = require('express');
var router = express.Router();
var db_helper = require("../database_utilities/db_helpers");
var http=require('http');
var patientData= require('../models/patient.js');
var schedData= require('../models/scheduleAppointment.js');
var prescriptionData= require('../models/updatePrescription.js');
var util = require('util');
/* GET home page. */
var schData = require('../models/scheduleAppointment.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//registers user data
router.get('/register', function(req, res, next){
    console.log('inside register');
    //  take data from http head how to get and parse data from post
    var patient=patientData.patient_model(req.query.pname,req.query.dob,req.query.address,req.query.policy_number);
    db_helper.registerPatient(patient,res);

});

router.get('/getDoctorList', function (req,res) {
    console.log('inside get doc list');
    db_helper.getDoctorList(res);
});

router.get('/scheduleAppointment', function (req,res) {
 console.log("check in query"+ req);
 // SEND AVI APP_ID WHEN HE SCHEDULES AN APPOINTMENT AND
    //
  console.log("in scheudle Appointment "+req.query.patientID +" "+req.query.docID +" "+req.query.appointmentST +" "+ "endddd");
  var dataschedule= {
      patientID:req.query.patientID,
      docID:req.query.docID,
      appointmentST:req.query.appointmentST,
       appointmentET:''
  }
  db_helper.scheduleAppointment(dataschedule,res);
});

router.get('/getCurrentAppointments',function(req,res){
    console.log('gives appointments for patient'+ req);
    db_helper.getCurrentAppointements(req.query.patientID,res);
});


router.get('/getPastAppointments',function(req,res){
    console.log('gives appointments for patient'+ req);
    db_helper.getPastAppointements(req.query.patientID,res);
});


router.get('/getAvailablility', function (req,res) {
    console.log('inside get availability');
    db_helper.getAvailibility(req.query.docID,res);
});



router.get('/enterDoctorRoom', function (req,res,next) {
  console.log(res.query);

  db_helper.enterDoctorRoom(req.query.docID,req.query.patientID,res);
});

router.get('/exitDoctorRoom', function (req,res,next) {
    console.log(res.query);
    db_helper.exitDoctorRoom(req.query.docID,req.query.patientID,req.query.appID ,res);
});

router.get('/getExpectedWaitingTime', function (req,res,next) {
    console.log('inside expected waiting time');
    db_helper.getExpectedWaitingTime(req.query.policyno,res);
});

router.get('/savePrescription', function (req,res,next) {
  console.log('inside save prescription');
  var prescription = prescriptionData.updatePrescription_model(req.query.policyno,req.query.med,req.query.exercise);
  db_helper.savePrescription(prescription,res);
});

router.get('/getPrescription', function (req,res) {
    console.log('inside get doc list');
    db_helper.getPrescription(req.query.policyno,res);
});




router.get('/getPatientDetails',function(req,res){
    console.log('gives appointments for patient'+ req);
   // db_helper.getPatientDetails(req.query.patientID,res);
    var output = {
        "name" : "aman",
        "age" : "25",
        "dob" : "25 March 1991"
    }
    res.send(output);
});


router.get('/getPatientMedicineHistory',function(req,res){
    console.log('gives appointments for patient'+ req);
    db_helper.getPatientMedicineHistory(req.query.patientID,res);
});

router.get('/getPatientExerciseHistory',function(req,res){
    console.log('gives appointments for patient'+ req);
    db_helper.getPatientExerciseHistory(req.query.patientID,res);
});

router.get('/saveMedicinePrescription',function (req,res) {
    console.log('enters patients medicinal data');
    db_helper.postMedicinePrescription();
});


router.get('/saveExercisePrescription',function (req,res) {
    console.log('enters patients exercise data');
    db_helper.postExercisePrescription();
});

module.exports = router;
