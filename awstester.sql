-- MySQL dump 10.13  Distrib 5.6.16, for Win32 (x86)
--
-- Host: localhost    Database: hygieia
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `App_ID` int(11) NOT NULL AUTO_INCREMENT,
  `AppointmentST` datetime DEFAULT NULL,
  `AppointmentET` datetime DEFAULT NULL,
  `AppointmentEST` datetime DEFAULT NULL,
  PRIMARY KEY (`App_ID`),
  UNIQUE KEY `App_ID_UNIQUE` (`App_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2017-04-09 13:00:00','2017-04-09 13:30:00','2017-04-09 13:00:00'),(2,'2017-04-10 13:30:00','2017-04-10 14:00:00','2017-04-10 13:00:00'),(3,'2017-04-11 15:30:00','2017-04-11 16:00:00','2017-04-11 15:30:00'),(4,'2017-04-11 15:30:00','2017-04-11 15:30:00','2017-04-11 15:30:00'),(5,'2017-04-11 15:30:00','2017-04-11 15:30:00','2017-04-11 15:30:00'),(6,'2017-04-13 16:30:00','2017-04-13 17:00:00','2017-04-13 16:30:00'),(7,'2017-04-13 15:00:00','2017-04-13 15:30:00','2017-04-13 15:00:00'),(8,'2017-04-13 15:00:00','2017-04-13 15:30:00','2017-04-13 15:00:00');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `Doc_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Speciality` varchar(100) NOT NULL,
  `Contact` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Doc_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'John Meyer','Heart_Disease',NULL),(2,'Patrick Dobra','Physician',NULL),(3,'Alen Cook','Breast Cancer Specialist',NULL),(4,'Markus Helal','Cardiologist',NULL),(5,'Daisy Smith','Gynaecologist',NULL),(6,'Wang Hu','ENT Specialist',NULL),(7,'Zing Ming','Child Specialist',NULL),(8,'Srinivasan P','Psychiatrist',NULL),(9,'Alper Brutus','Physician',NULL),(10,'Meera Singh','Physician',NULL);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_slot`
--

DROP TABLE IF EXISTS `doctor_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_slot` (
  `Doc_ID` int(11) NOT NULL,
  `Slot_ID` int(11) NOT NULL,
  `IsAvailable` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`Doc_ID`,`Slot_ID`),
  KEY `slot_ID_CONSTRAINT` (`Slot_ID`),
  CONSTRAINT `DOCTOR_SLOT_CONSTRAINT` FOREIGN KEY (`Doc_ID`) REFERENCES `doctor` (`Doc_ID`),
  CONSTRAINT `slot_ID_CONSTRAINT` FOREIGN KEY (`Slot_ID`) REFERENCES `slots` (`SLOT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_slot`
--

LOCK TABLES `doctor_slot` WRITE;
/*!40000 ALTER TABLE `doctor_slot` DISABLE KEYS */;
INSERT INTO `doctor_slot` VALUES (1,1,1),(1,2,1),(1,3,1),(1,7,1),(2,1,1),(2,2,1),(2,7,1),(2,10,1),(3,8,1),(3,10,1),(4,5,1),(4,8,1),(7,9,1),(9,3,1);
/*!40000 ALTER TABLE `doctor_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `Exercise_ID` int(11) NOT NULL,
  `Exercise_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Exercise_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'Yoga'),(2,'Jogging'),(3,'Cardio'),(4,'Evening Walk'),(5,'Pranayam'),(6,'Swimming');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicines` (
  `Medicine_ID` int(11) NOT NULL,
  `Medicine_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Medicine_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'Aspirin'),(2,'Dispirin'),(3,'FeverCold'),(4,'Brufin');
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `Patient_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Pname` varchar(255) DEFAULT NULL,
  `Dateofbirth` date DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Policy_No` int(11) NOT NULL,
  `Fitbit_URL` varchar(255) DEFAULT NULL,
  `Symptom_URL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Patient_ID`),
  UNIQUE KEY `Policy_No` (`Policy_No`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Yash','1994-12-30','SW 34th Street',1231251,NULL,NULL),(2,'Yashg','0000-00-00','SW 34th Street',1231258,NULL,NULL),(3,'Satyam','1991-03-25','39th Blvd',1234565,NULL,NULL),(4,'Kunal','1993-12-04','Mira Road',1673533,NULL,NULL),(5,'Avinash','1991-02-04','Stoneridge Apt X',4526171,NULL,NULL),(6,'Karan','1995-11-27','SW 34th Street',12356258,NULL,NULL),(7,'Sanchit Sharma','1994-10-15','CC534 39th Blvd',18364281,NULL,NULL),(16,'Ishant kulkarni','1993-10-15','GG531 39th Blvd',3455432,NULL,NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_medical_details`
--

DROP TABLE IF EXISTS `patient_medical_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_medical_details` (
  `Doc_ID` int(11) NOT NULL,
  `Patient_ID` int(11) NOT NULL,
  `App_ID` int(11) NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0',
  `Medicine_Details` multilinestring DEFAULT NULL,
  `Exercise_Details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Doc_ID`,`App_ID`,`Patient_ID`),
  UNIQUE KEY `App_ID` (`App_ID`),
  KEY `Patient_ID_CONSTRAINT` (`Patient_ID`),
  CONSTRAINT `App_ID_CONSTRAINT` FOREIGN KEY (`App_ID`) REFERENCES `appointments` (`App_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Doc_ID_CONSTRAINT` FOREIGN KEY (`Doc_ID`) REFERENCES `doctor` (`Doc_ID`),
  CONSTRAINT `Patient_ID_CONSTRAINT` FOREIGN KEY (`Patient_ID`) REFERENCES `patient` (`Patient_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_medical_details`
--

LOCK TABLES `patient_medical_details` WRITE;
/*!40000 ALTER TABLE `patient_medical_details` DISABLE KEYS */;
INSERT INTO `patient_medical_details` VALUES (1,1,1,0,0,NULL,NULL),(1,5,2,0,1,NULL,NULL),(1,2,8,0,1,NULL,NULL),(2,5,3,0,0,NULL,NULL),(6,2,7,0,0,NULL,NULL),(7,1,6,0,0,NULL,NULL),(10,2,5,0,0,NULL,NULL);
/*!40000 ALTER TABLE `patient_medical_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slots` (
  `Slot_ID` int(11) NOT NULL,
  `ST` time NOT NULL,
  `ET` time NOT NULL,
  PRIMARY KEY (`Slot_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (1,'10:00:00','10:30:00'),(2,'10:30:00','11:00:00'),(3,'11:00:00','11:30:00'),(4,'11:30:00','12:00:00'),(5,'12:00:00','12:30:00'),(6,'12:30:00','13:00:00'),(7,'13:30:00','14:00:00'),(8,'14:00:00','14:30:00'),(9,'14:30:00','15:00:00'),(10,'15:00:00','15:30:00'),(11,'15:30:00','16:00:00');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-10  4:56:23
