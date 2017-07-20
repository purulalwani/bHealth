pragma solidity ^0.4.2;
import "./Condition.sol";

contract Patient {


  string public name = "";
  string public dateOfBirth = "";
  string public gender = "" ;
  address[] conditions;

  // Event that is fired when patient is changed
  event patientChanged(string whatChanged);

//  function Patient(){
  //  conditions = new Condition[](10);
  //}

  // FAMILY^GIVEN^MIDDLE
  function setName(string _name) {
    name = _name;
    patientChanged("name changed"); // fire the event
  }
  // YYYYMMDD
  function setDateOfBirth(string _dateOfBirth) {
    dateOfBirth = _dateOfBirth;
    patientChanged("dateOfBirth changed"); // fire the event
  }
  // M,F,U,O
  function setGender(string _gender) {
    gender = _gender;
    patientChanged("gender changed"); // fire the event
  }

  function setPatient(string _name, string _dateOfBirth, string _gender, string _condition) {
    name = _name;
    dateOfBirth = _dateOfBirth;
    gender = _gender;
    Condition c = new Condition(_condition, _condition);
    conditions.push(c);
    patientChanged("Patient Changed"); // fire the event
  }

  function addCondition(string _id, string _desc){
    Condition c = new Condition(_id, _desc);
    conditions.push(c);
    patientChanged("condition added");
  }

  function getCondition() returns (address[]){
    return conditions;
  }
}
