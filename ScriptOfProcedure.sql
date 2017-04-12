delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_appointment_history`(
IN patient_ID INT
)
BEGIN
SELECT D.NAME, A.AppointmentEST, A.AppointmentET
FROM doctor D, patient_medical_details PMD, appointments A
WHERE D.Doc_ID=PMD.Doc_ID AND PMD.isDELETED=1 AND PMD.Patient_ID=patient_ID AND A.App_ID=PMD.App_ID;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_availibility`(
IN docID int
)
BEGIN
SELECT S.Slot_ID,S.ST,S.ET
FROM slots S, doctor_slot DS
WHERE DS.Doc_ID=docID AND DS.IsAvailable=1 AND S.Slot_ID=DS.Slot_ID;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_current_appointments`(
IN
patient_ID INT
)
BEGIN
SELECT D.NAME, A.AppointmentEST, A.AppointmentET
FROM doctor D, patient_medical_details PMD, appointments A
WHERE D.Doc_ID=PMD.Doc_ID AND PMD.isDELETED=0 AND PMD.Patient_ID=patient_ID AND A.App_ID=PMD.App_ID;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_doctor_list`()
BEGIN
SELECT D.Doc_ID, D.Name, D.Speciality, D.Contact
FROM doctor D;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_doctor_listssss`()
BEGIN
SELECT D.Doctor_ID, D.Name, D.Speciality, D.Contact
FROM doctor D;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_exercise_list`()
BEGIN
SELECT Exercise_Name 
FROM Exercises;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_expectedST`(
IN 
patient_ID INT,
doc_ID INT
)
BEGIN
SELECT A.AppointmentEST
FROM patient_medical_details PMD, appointents A
WHERE PMD.Patient_ID=patient_ID AND PMD.Doc_ID=doc_ID 
AND PMD.App_ID=A.App_ID AND isDeleted=0 AND A.AppointmentST=CURDATE();
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_latest_prescription`(
IN 
patient_ID int
)
BEGIN
SELECT *
FROM 
(SELECT PMD.Medicine_Details,PMD.Doc_ID
FROM patient_medical_details PMD, appointments A
WHERE PMD.Patient_ID=patient_ID AND A.App_ID=PMD.App_ID AND PMD.isDeleted=1 AND PMD.Status=0
ORDER BY A.App_ID DESC) D
LIMIT 1;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_medicine_list`()
BEGIN
SELECT Medicine_Name
FROM medicines;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_past_appointments`(
IN
patient_ID INT
)
BEGIN
SELECT D.NAME, A.AppointmentEST, A.AppointmentET
FROM doctor D, patient_medical_details PMD, appointments A
WHERE D.Doc_ID=PMD.Doc_ID AND PMD.isDELETED=1 AND PMD.Patient_ID=patient_ID AND A.App_ID=PMD.App_ID;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_patient_details`(
IN
patientid INT
)
BEGIN
SELECT Patient_ID,Pname, Dateofbirth, Address, Policy_No, Fitbit_URL, Symptom_URL
FROM patient 
WHERE Patient_ID=patientid;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_patient_medicine_history`(
IN
patient_ID INT
)
BEGIN
SELECT PMD.Medicine_Details,D.Name, DATE(A.AppointmentST)
FROM patient_medical_deails PMD, appointments A, doctor D
WHERE A.App_ID=PMD.App_ID AND PMD.isDeleted=1 AND PMD.Status=0 AND D.Doc_ID=PMD.Doc_ID
ORDER BY A.AppointmentST DESC;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_patient_entered_doc_room`(
IN
doc_id int,
pat_id int
)
BEGIN
UPDATE patient_medical_details PMD
SET PMD.Status=1
WHERE PMD.Patient_ID=pat_id and PMD.Doc_ID=doc_id;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_patient_exit_soft_delete`(
IN 
doc_id int,
pat_id int,
app_id int
)
BEGIN

select 0;
UPDATE patient_medical_details PD
SET PD.Status=0
WHERE PD.Doc_ID=doc_id and PD.Patient_ID=pat_id AND PD.App_ID=app_id;

UPDATE patient_medical_details BC
SET BC.isDeleted=1
WHERE BC.Doc_ID=doc_id and BC.Patient_ID=pat_id AND BC.App_ID=app_id AND BC.STATUS=0;

SELECT @CURRDATE= DATE(AppointmentST) 
				FROM appointments 
				WHERE App_ID = app_id;

UPDATE appointments A, patient_medical_details PMD
SET A.AppointmentEST=A.AppointmentEST+ INTERVAL 30 MINUTE
WHERE PMD.App_ID=A.App_ID
AND PMD.isDeleted=0 
AND PMD.Doc_ID=doc_id
AND DATE(A.AppointmentST)=@CURRDATE; 
   
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register_patient`(
IN 
pname varchar(100),
dob date,
addr varchar(230),
policyno int,
gender int,
phoneno varchar(15)
)
BEGIN
INSERT INTO patient (Pname,Dateofbirth,Address,Policy_No,Phone_No,Gender)
VALUES (pname,dob,addr,policyno,phoneno,gender);

SELECT MAX(P.Patient_ID) as PatientID
FROM patient P;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_save_medicine_details`(
IN
patient_ID INT,
doc_ID INT,
med varchar(255),
app_ID INT
)
BEGIN
UPDATE patient_medical_details PMD
SET PMD.Medicine_Details=med
WHERE PMD.Patient_ID=patient_ID AND PMD.Doc_ID=doc_ID AND PMD.App_ID=app_ID;
END$$


delimiter $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_schedule_appointment`(IN
docID int,
Patient_ID int,
VAppointmentST datetime,
VAppointmentET datetime,
slotID INT
)
BEGIN
INSERT INTO
appointments (AppointmentST,AppointmentET,AppointmentEST)
VALUES
(VAppointmentST,VAppointmentET,VAppointmentST);

SET @app_ID=(SELECT MAX(App_ID) FROM appointments);
 
INSERT INTO
patient_medical_details (Doc_ID,Patient_ID,App_ID)
VALUES 
(docID, 
Patient_ID,@app_ID
);
SELECT MAX(App_ID) as AppID
FROM APPOINTMENTS;

update doctor_slot ds
set ds.isAvailable=0
where ds.Doc_ID=docID and ds.Slot_ID=slotID;

END$$


