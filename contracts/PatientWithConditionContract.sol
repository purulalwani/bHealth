pragma solidity ^0.4.2;
//import "./Condition.sol";

contract PatientWithConditionStruct {

  string public name;
  string public dateOfBirth;
  string public gender;
  //Condition[] conditions;

  struct Condition{
    // condition id
    string id;
    // condition description
    string desc;
  }

  mapping (uint => Condition) conditions;
  uint public conditionCounter = 0;

  // Event that is fired when patient is changed
  event patientChanged(string whatChanged);

  /*function Patient(){
    conditions = new Condition[](10);
  }*/

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
    conditions[conditionCounter] = Condition(_condition, _condition);
    conditionCounter++;
    /*Condition c = new Condition(_condition, _condition);
    conditions.push(c);*/
    patientChanged("Patient Changed"); // fire the event
  }

  function addCondition(string _id, string _desc){
    /*Condition c = new Condition(_id, _desc);
    conditions.push(c);*/
    conditions[conditionCounter] = Condition(_id, _desc);
    conditionCounter++;
    patientChanged("condition added");
  }

  function getCondition(uint index) returns (string _id, string _desc){
    string id = conditions[index].id;
    string desc = conditions[index].desc;

    return (id, desc);
  }
}
