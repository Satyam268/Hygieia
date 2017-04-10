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
    console.log(util.inspect(patient, false, null));
    connection.query('call sp_patient_data_insert(?,?,?,?)',[patientData.pname,patientData.dob,patientData.address,patientData.policyno],function (error,rows) {
        //callback
        if(!!error){
            console.log('error from db'+error);
            res.send('-1');        }
        else{
            // console.log(fields);
            console.log('query successful');
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
    connection.query('call sp_schedule_appointment(?,?,?,?)', [schData.docID, schData.patientID, schData.appointmentST, schData.appointmentET], function (error, rows) {
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
            res.send(rows[0]);
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
    connection.query('call sp_update_pat_doc_assoc(?,?)',[docID,patientID],function (error,rows,fields) {
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
            res.send(rows[0]);
        }
    });
}

helpers.savePrescription = function(updPre,res){
    connection.query('call sp_save_prescription(?,?,?)',[updPre.policyno,updPre.med,updPre.exercise],function (error,rows,fields) {
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
            //res.send('1');
        }
    });
}

helpers.exitDoctorRoom = function (docID,patientID,appID,res) {
    connection.query('call sp_patient_exit_soft_delete(?,?,?)',[docID,patientID,appID],function (error,rows,fields) {
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


module.exports = helpers;