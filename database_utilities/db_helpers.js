/**
 * Created by yashk on 01-04-2017.
 */
var express= require('express');
const util=require('util');
var helpers = {};
var patientData= require('../models/patient.js');
//var schData = require('../models/scheduleAppointment.js');
var connection = require('../config/dbConnection');
var moment = require('moment');

helpers.registerPatient = function(patient,res){
    patientData=patient;
    console.log('patient global'+ patient.policyno);
    console.log(util.inspect(patient, false, null));
    connection.query('call sp_register_patient(?,?,?,?,?,?)',[patientData.pname,patientData.dob,patientData.address,patientData.policyno,patientData.gender,patientData.phoneno],function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }

            var pat = JSON.stringify(rows[0]);
            var patt= JSON.parse(pat);
            console.log("pat: "+patt[0].PatientID);
            res.send(""+patt[0].PatientID);
        }
    });
}

helpers.getDoctorList = function(res){
    connection.query('call sp_get_doctor_list()',function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.scheduleAppointment =  function(schData,res) {
    // sql queries 2,1234565, '2017-02-26 13:30:00' ,'2017-02-26 14:00:00'
    var data=moment(schData.appointmentST).add(30,'m');
        schData.appointmentET =data.toDate();
    connection.query('call sp_schedule_appointment(?,?,?,?,?)', [schData.docID, schData.patientID, schData.appointmentST,
        schData.appointmentET, schData.slotID], function (error, rows){
        //callback
        if (!!error) {
            console.log('error from db' + error);
            res.send('-1');
        }
        else {
            // console.log(fields);
            console.log('query successful');
            if (rows != null) {
                console.log(rows[0]);
            }
            else {
                console.log(rows[0]);
            }
            var app = JSON.stringify(rows[0]);
            var appnt= JSON.parse(app);
            console.log("pat: "+appnt[0].AppID);
            res.send(""+appnt[0].AppID);
        }
    });
}

helpers.getAvailibility = function(docID, res){
    connection.query('call sp_get_availibility('+docID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getCurrentAppointements = function(patientID, res){
    //what do we want all appointments of the patient or appointments with a particular doctor?
    connection.query('call sp_get_current_appointments('+patientID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            var date =new Date(rows[0][0].AppointmentEST);
            rows[0].forEach(function (element) {
                element.NAME=element.NAME;
                element.AppointmentEST=element.AppointmentEST.toString();
                element.AppointmentET=element.AppointmentET.toString();
                element.AppointmentEST=element.AppointmentEST.substring(0,element.AppointmentEST.lastIndexOf(':'));
                element.AppointmentET=element.AppointmentET.substring(0,element.AppointmentET.lastIndexOf(':'));
            });
            //rows[0][0].AppointmentEST=rows[0][0].AppointmentEST.toString();
          //  rows[0][0].AppointmentET=rows[0][0].AppointmentET.toString();
            //moment.tz(rows[0][0].AppointmentEST,EST).format();
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getPastAppointements = function(patientID, res){
    //what do we want all appointments of the patient or appointments with a particular doctor?
    connection.query('call sp_get_past_appointments('+patientID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getPrescription=function(patientID,res){
    connection.query('call sp_get_prescription('+patientID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}


helpers.enterDoctorRoom = function(docID,patientID,res){
    connection.query('call sp_patient_entered_doc_room(?,?)',[docID,patientID],function (error,rows,fields) {
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query Enter Doc Room successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send('1');
        }
    });
}
helpers.getPatientDetails = function (patientID, res) {
    console.log('patientID '+patientID);
    connection.query('call sp_get_patient_details('+patientID+')' ,function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);

        }
    });
}

helpers.savePrescription = function(updPre,res){
    connection.query('call sp_save_prescription(?,?,?)',[updPre.policyno,updPre.med,updPre.exercise],function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
          //  res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            var respMsg = '{response:1}';
              res.send(respMsg);
            res.send('1');
        }
    });
}

helpers.exitDoctorRoom = function (docID,patientID,appointmentST,res) {
    connection.query('call sp_patient_exit_soft_delete(?,?,?)',[docID,patientID,appointmentST],function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);

            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            var respMsg = '{response:1}';
            res.send(respMsg);
        }
    });
}

helpers.getExpectedWaitingTime = function (policyno,res) {
    connection.query('call sp_get_expectedWT('+policyno+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getSymptoms = function (patientID,res) {
    //res in form  of URL
    connection.query('call sp_get_symptoms('+patientID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });

}

helpers.getCompliance = function (patientID,res) {
    //res in form  of URL
    connection.query('call sp_get_compliance('+patientID+')',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });

}

helpers.addPrescription = function (req,res) {
    // req has pre: patientID medicine(name and timings), exercise,
    connection.query('call sp_add_prescription(?,?,?)',[req.query.patientID],function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getMedicineList = function (res) {
    // req has pre: patientID medicine(name and timings), exercise,
    connection.query('call sp_get_medicine_list()',function (error,rows,fields) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send({response: '-1'});
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            console.log("in medicine list "+ res);
            res.send(rows[0]);
        }
    });
}


helpers.getExerciseList = function (res) {
    // req has pre: patientID medicine(name and timings), exercise,
    connection.query('call sp_get_exercise_list()',function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send({response: '-1'});
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.saveMedicinePrescription = function (details,res) {
    connection.query('call sp_save_medicine_prescription(?,?,?,?)',
        [details.patientID, details.medicineDetails,details.docID,details.appointmentID],function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send({response: '-1'});
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.saveExercisePrescription = function (details,res) {
    connection.query('call sp_save_exercise_prescription(?,?,?,?)',
        [details.patientID, details.docID,details.exercisetype,details.appointmentID],function (error,rows) {
            if(!!error){
            console.log('error from db'+error);
            res.send({response: '-1'});
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.postedFromAlexa = function (symptomData,patientID,res) {

    connection.query('call sp_postedFromAlexa('+patientID+','+symptomData+')',function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send({response: '-1'});
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
}

helpers.getDoctorList_filtered = function(res, param){
    console.log("params:"+param);

    connection.query('call sp_get_filtered_doctor_list('+param+')',function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                console.log(rows[0]);
            }
            else{
                console.log(rows[0]);
            }
            res.send(rows[0]);
        }
    });
};

helpers.getAlexaStatus = function(res, param){
    console.log("param in  get alexa status: "+param);
    connection.query('call sp_get_alexa_status('+param+')',function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
        }
        else{
            // console.log(fields);
            console.log('query successful');
            if(rows!=null) {
                //console.log(data);
                console.log("result "+rows[0][0]);
            }
            else{
                console.log("result is null");
            }
            res.send(""+rows[0][0].indicator);
        }
    });
}

module.exports = helpers;