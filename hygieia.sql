-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2017 at 03:22 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hygieia`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_pat_doc_assoc`(
IN 
doc_id int,
pat_id int
)
BEGIN
UPDATE PATIENT_DOC PD
SET PD.STATUS='DONE'
WHERE PD.Doc_ID=doc_id and PD.Patient_ID=pat_id;

UPDATE PATIENT_DOC BC
SET BC.isDeleted='true'
WHERE BC.Doc_ID=doc_id and BC.Patient_ID=pat_id AND BC.STATUS='DONE';  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_doctor_list`()
BEGIN
SELECT *
FROM doctor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_expectedWT`(
IN 
policyno int
)
BEGIN
SELECT E_AppointmentST
FROM PATIENT_DOC
WHERE Patient_ID=policyno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_prescription`(
IN 
policyno int
)
BEGIN
SELECT Exercise,Medicine
FROM PATIENT
WHERE Policy_No=policyno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_slots`(
IN docID int
)
BEGIN
SELECT S.ST,S.ET
FROM slots S, doctor_slot D
WHERE D.Doc_ID=docID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_patient_data_insert`(
IN 
pname varchar(100),
dob date,
addr varchar(230),
policyno int)
BEGIN
INSERT INTO PATIENT 
VALUES (pname,dob,addr,policyno,null,null);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_save_prescription`(
IN
policyno int,
med varchar(255),
exercise varchar(255)
)
BEGIN
UPDATE PATIENT P
SET P.Medicine=med, P.Exercise=exercise
WHERE P.Policy_No=policyno;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_schedule_appointment`(IN
Doc_ID int,
Patient_ID int,
AppointmentST datetime,
AppointmentET datetime,
E_AppointmentST datetime,
pstatus VARCHAR(10))
BEGIN 
INSERT INTO
PATIENT_DOC 
VALUES 
(Doc_ID, 
Patient_ID, 
AppointmentST, 
AppointmentET,
E_AppointmentST,
pstatus);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_test`()
BEGIN
SELECT 2;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_pat_doc_assoc`(
IN
doc_id int,
pat_id int
)
BEGIN
UPDATE PATIENT_DOC PD
SET PD.status='DONE'
WHERE PD.Patient_ID=pat_id and PD.Doc_ID=doc_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE IF NOT EXISTS `doctor` (
  `Doc_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Speciality` varchar(100) NOT NULL,
  PRIMARY KEY (`Doc_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`Doc_ID`, `Name`, `Speciality`) VALUES
(1, 'John Meyer', 'Heart_Disease'),
(2, 'Patrick Dobra', 'Physician'),
(3, 'Alen Cook', 'Breast Cancer Specialist'),
(4, 'Markus Helal', 'Cardiologist'),
(5, 'Daisy Smith', 'Gynaecologist'),
(6, 'Wang Hu', 'ENT Specialist'),
(7, 'Zing Ming', 'Child Specialist'),
(8, 'Srinivasan P', 'Psychiatrist'),
(9, 'Alper Brutus', 'Physician'),
(10, 'Meera Singh', 'Physician');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_slot`
--

CREATE TABLE IF NOT EXISTS `doctor_slot` (
  `Doc_ID` int(11) NOT NULL,
  `Slot_ID` int(11) NOT NULL,
  PRIMARY KEY (`Doc_ID`,`Slot_ID`),
  KEY `slot_ID_CONSTRAINT` (`Slot_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_slot`
--

INSERT INTO `doctor_slot` (`Doc_ID`, `Slot_ID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `Pname` varchar(100) DEFAULT NULL,
  `Dateofbirth` date DEFAULT NULL,
  `Address` varchar(230) DEFAULT NULL,
  `Policy_No` int(11) NOT NULL,
  `Medicine` varchar(255) DEFAULT NULL,
  `Exercise` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Policy_No`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`Pname`, `Dateofbirth`, `Address`, `Policy_No`, `Medicine`, `Exercise`) VALUES
('Yash', '1994-12-30', 'SW 34th Street', 1231251, NULL, NULL),
('Yashg', '0000-00-00', 'SW 34th Street', 1231258, NULL, NULL),
('Satyam', '1991-03-25', '39th Blvd', 1234565, 'Aspirin', 'Squats'),
('Kunal', '1993-12-04', 'Mira Road', 1673533, NULL, NULL),
('Avinash', '1991-02-04', 'Stoneridge Apt X', 4526171, 'Metrogen', 'Yoga'),
('fdgf', '1995-11-27', 'SW 34th Street', 12356258, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient_doc`
--

CREATE TABLE IF NOT EXISTS `patient_doc` (
  `Doc_ID` int(11) NOT NULL,
  `Patient_ID` int(11) NOT NULL,
  `AppointmentST` datetime NOT NULL,
  `AppointmentET` datetime NOT NULL,
  `E_AppointmentST` datetime NOT NULL,
  `Status` varchar(10) NOT NULL,
  `isDeleted` varchar(10) NOT NULL,
  PRIMARY KEY (`Doc_ID`,`Patient_ID`),
  KEY `PATIENT_ID_CONSTRAINT` (`Patient_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_doc`
--

INSERT INTO `patient_doc` (`Doc_ID`, `Patient_ID`, `AppointmentST`, `AppointmentET`, `E_AppointmentST`, `Status`, `isDeleted`) VALUES
(1, 1234565, '2017-04-02 12:00:00', '2017-04-02 12:30:00', '2017-04-02 12:00:00', 'true', 'false'),
(1, 4526171, '2017-04-02 12:30:00', '2017-04-02 13:00:00', '2017-04-02 12:30:00', 'DONE', 'true'),
(2, 1234565, '2017-02-26 13:30:00', '2017-02-26 14:00:00', '2017-02-26 13:40:00', 'valid', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE IF NOT EXISTS `slots` (
  `Slot_ID` int(11) NOT NULL,
  `ST` datetime NOT NULL,
  `ET` datetime NOT NULL,
  PRIMARY KEY (`Slot_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`Slot_ID`, `ST`, `ET`) VALUES
(1, '2017-04-02 10:30:00', '2017-04-02 17:30:00'),
(2, '2017-04-02 10:00:00', '2017-04-02 17:30:00');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_slot`
--
ALTER TABLE `doctor_slot`
  ADD CONSTRAINT `DOCTOR_SLOT_ADD CONSTRAINT` FOREIGN KEY (`Doc_ID`) REFERENCES `doctor` (`Doc_ID`),
  ADD CONSTRAINT `slot_ID_ADD CONSTRAINT` FOREIGN KEY (`Slot_ID`) REFERENCES `slots` (`SLOT_ID`);

--
-- Constraints for table `patient_doc`
--
ALTER TABLE `patient_doc`
  ADD CONSTRAINT `Doctor_ID_ADD CONSTRAINT` FOREIGN KEY (`Doc_ID`) REFERENCES `doctor` (`Doc_ID`),
  ADD CONSTRAINT `PATIENT_ID_ADD CONSTRAINT` FOREIGN KEY (`Patient_ID`) REFERENCES `patient` (`Policy_No`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
