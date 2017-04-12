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
var qs = require('querystring');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//registers user data
router.post('/register', function(req, res, next){
    console.log('inside register');
    //  take data from http head how to get and parse data from post

    var reqbody= JSON.parse(Object.keys(req.body)[0]);
    //console.log("after parsing: "+datatopoush+" "+ datatopoush.pname);
    patientData.patient_model(reqbody.pname,reqbody.dob,reqbody.address,reqbody.policyno,reqbody.gender,reqbody.phoneno);
        var patient=patientData;

        db_helper.registerPatient(patient,res);

});

router.get('/getDoctorList', function (req,res) {
    console.log('inside get doc list');
    if(req.query.patientID !== null){
        db_helper.getDoctorList_filtered(res, req.query.patientID);
    }
    else{
        db_helper.getDoctorList(res);
    }
});

router.get('/getAlexaStatus', function (req,res) {
    console.log('get alexa status route called');
    var param = -1;
    if(req.query.patientID != null) {
        param = req.query.patientID;
        db_helper.getAlexaStatus(res, param);
    }
    console.log("patient id for alexa status"+param);
});

router.get('/getAvailability', function (req,res) {
    console.log('inside get availability');
    db_helper.getAvailibility(req.query.docID,res);
});

router.post('/scheduleAppointment', function (req,res) {
 console.log("check in query"+ req+ "obejct keys "+ Object.keys(req.body)+"  ");
 // SEND AVI APP_ID WHEN HE SCHEDULES AN APPOINTMENT AND
    //
    var reqbody= JSON.parse(Object.keys(req.body)[0]);
   // reqbody=req.body;
    console.log("in scheudle Appointment "+reqbody +"after req body "+reqbody.patientID +" "+reqbody.docID +" "+reqbody.appointmentST +" "+ "endddd");
  var dataschedule= {
      patientID:reqbody.patientID,
      docID:reqbody.docID,
      appointmentST:reqbody.appointmentST,
       appointmentET:'',
      slotID:reqbody.slotID
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

router.post('/enterDoctorRoom', function (req,res,next) {

    var reqbody= JSON.parse(Object.keys(req.body));
    console.log("entered doc room"+reqbody);
    db_helper.enterDoctorRoom(reqbody['docID'],reqbody['patientID'],res);
});

router.post('/exitDoctorRoom', function (req,res,next) {
    var reqbody= JSON.parse(Object.keys(req.body));
    console.log("entered doc room"+reqbody);
    //console.log(res.query);
    db_helper.exitDoctorRoom(reqbody['docID'],reqbody['patientID'],reqbody['appointmentST'] ,res);
});

router.get('/getExpectedWaitingTime', function (req,res,next) {
    console.log('inside expected waiting time');
    db_helper.getExpectedWaitingTime(req.query.policyno,res);
});

router.post('/postMedicinePrescription', function (req,res) {
  console.log('inside save prescription');
    console.log("check in query"+ req+ "obejct keys "+ Object.keys(req.body)+"  ");
    var data='';
    Object.keys(req.body).forEach(function (element) {
        data.append("( "+element['Medicine Name']+" "+element['Timings']+" ),");
    });

    // doctorID=1 and patient appointmentID= 1
    db_helper.postMedicinePrescription(data,res);
});

router.post('/postExercisePrescription', function (req,res) {
    console.log('inside save prescription');
    console.log("check in query"+ req+ "obejct keys "+ Object.keys(req.body)+"  ");
    var data='';
    Object.keys(req.body).forEach(function (element) {
        data.append("( "+element['Exercise Type']+" "+element['Description']+" ),");
    });

    // doctorID=1 and patient appointmentID= 1
    db_helper.postExercisePrescription(data,res);
});

/*

router.get('/getPrescription', function (req,res) {
    console.log('inside get doc list');
    db_helper.getPrescription(req.query.policyno,res);
});
*/



router.get('/getPrescription', function (req,res) {
    console.log('inside get doc list');
    db_helper.getPrescription(req.query.policyno,res);
});




router.get('/getPatientDetails',function(req,res){
    console.log('gives appointments for patient'+ req);
    db_helper.getPatientDetails(req.query.patientID,res);
});


router.get('/getPatientMedicineHistory',function(req,res){
    console.log('gives medicine history for patient'+ req);
    //give doctor name and the prescription name he gave and the date

    db_helper.getPatientMedicineHistory(req.query.patientID,res);
});

router.get('/getPatientExerciseHistory',function(req,res){
    console.log('gives appointments for patient'+ req);
    //give doctor name and the prescription name he gave and the date
    db_helper.getPatientExerciseHistory(req.query.patientID,res);
});

router.get('/saveMedicinePrescription',function (req,res) {
    console.log('enters patients medicinal data'+ req);
    db_helper.postMedicinePrescription();
});


router.get('/postExercisePrescription',function (req,res) {
    console.log('enters patients exercise data');
    db_helper.saveExercisePrescription(req,res);
});

router.get('/getExerciseList',function (req,res) {
    console.log('enters patients exercise data');
    db_helper.getExerciseList(res);
});

router.get('/getMedicineList',function (req,res) {
    console.log('enters patients exercise data');
    db_helper.getMedicineList(res);
});

//Alexa ko path
router.post('/postedFromAlexa',function (req,res) {
    console.log('enters patients exercise data');
    // object, symptoms key value same, one key with patient ID:
    console.log("check in query"+ req+ "object keys "+ Object.keys(req.body)+"  ");
    console.log("req.body.symptoms:     "+req.body.symptoms);

    var data = JSON.parse(req.body.symptoms);
    var len = data.length;
    var symptomsData = Object.keys(data);
    data = '';
    for(var i=0;i<symptomsData.length;i++)
        data+= symptomsData[i]+",";

   /* Object.keys(req.body['symptoms']).forEach(entry){
        symptomsData += entry+" ";
    };*/
    console.log("symptoms: "+data+" "+ "patientID: "+ req.body.patientID);
    db_helper.postedFromAlexa(req.body.patientID,data,res);
});

module.exports = router;
