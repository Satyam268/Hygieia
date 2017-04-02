/**
 * Created by yashk on 02-04-2017.
 */
module.exports.schedApp_model=function(docID,patientID,appointmentST,appointmentET,EstimatedST,ststus){
    this.docID=docID;
    this.patientID=patientID;
    this.appointmentST=appointmentST;
    this.appointmentET=appointmentET;
    this.EstimatedST=EstimatedST;
    this.Pstatus=ststus;
};

