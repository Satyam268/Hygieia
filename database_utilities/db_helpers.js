/**
 * Created by yashk on 01-04-2017.
 */
var express= require('express');
var mysql = require('mysql');
var helpers = {};
var patientData= require('../models/patient.js');
var schData = require('../models/scheduleAppointment.js');
var connection = mysql.createConnection({
    //properties:
    host: 'localhost',
    user: 'root',
    password:'',
    database:'hygieia'
});

connection.connect(function (error) {
    if(!!error){
        console.log('error while connection');
    }
    else{
        console.log('connection established');
    }
});

helpers.scheduleAppointment =  function(error,schData,res) {
    // sql queries 2,1234565, '2017-02-26 13:30:00' ,'2017-02-26 14:00:00','2017-02-26 13:40:00','valid'
    connection.query('call sp_schedule_appointment(?,?,?,?,?,?)',[schData.docID,schData.patientID,schData.appointmentST,schData.appointmentET,schData.EstimatedST],function (error,rows,fields) {
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

helpers.getDoctorList = function(res){
    connection.query('call sp_get_doctor_list()',function (error,rows,fields) {
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

helpers.getAppointement = function(docID, res){
    connection.query('call sp_get_slots('+docID+')',function (error,rows,fields) {
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

helpers.getPrescription=function(policyno,res){
    connection.query('call sp_get_prescription('+policyno+')',function (error,rows,fields) {
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

helpers.addPatient= function(patient,res){
    connection.query('call sp_patient_data_insert(?,?,?,?)',[patientData.pname,patientData.dob,patientData.address,patientData.policyno],function (error,rows,fields) {
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
            var respMsg = '{response:1}';
            res.send(respMsg);
            //res.send('1');
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

helpers.exitDoctorRoom = function (docID,patientID,res) {
    connection.query('call sp_delete_pat_doc_assoc(?,?)',[docID,patientID],function (error,rows,fields) {
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
module.exports = helpers;