pragma solidity ^0.4.2;

contract PatientAllergies {
    // the address of the owner (the patient)
    address public owner;
    // address of physician that can add allergies
    address public physician;
    // name of the patient LAST^FIRST
    string public name;
    // array of allergies this patient has
    string[] public allergies;

    // constructor that sets the owner to the address creating
    // this smart contract
    function PatientAllergies() {
        owner = msg.sender;
    }

    // allows owner to change the patient name
    function SetName(string _name) {
        // only allow the owner to change the patient name
        if(msg.sender != owner) {
            throw;
        }
        name = _name;
    }

    // allows physician to add an allergy
    function AddAllergy(string _allergie) {
        if(msg.sender != physician) {
            throw;
        }
        allergies.push(_allergie);
    }

    // allows owner to set the physician that can add allergies
    function SetPhysician(address _physician) {
        if(msg.sender != owner) {
            throw;
        }
        physician = _physician;
    }
}
