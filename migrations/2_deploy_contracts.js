var Patient = artifacts.require("./Patient.sol");
var PatientAllergies = artifacts.require("./PatientAllergies.sol");

module.exports = function(deployer) {
  deployer.deploy(Patient);
  deployer.deploy(PatientAllergies);

};
