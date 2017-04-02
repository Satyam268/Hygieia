var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//registers user data
router.post('/register', function(req, res, next){

});

router.post('/scheduleAppointment', function (req,res,next) {

});

router.get('/enterDoctorRoom', function (req,res,next) {

});

router.get('/exitDoctorRoom', function (req,res,next) {

});

router.get('/getExpectedWaitingTime', function (req,res,next) {

});

router.post('/savePrescription', function (req,res,next) {

});

router.get('/getPrescription', function (req,res,next) {

});


router.get('/getDoctorList', function (req,res,next) {

});


router.get('/getAvailablility', function (req,res,next) {

});


module.exports = router;
