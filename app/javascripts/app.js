// import libraries which we need
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ethjsabi from 'ethjs-abi';

// Import our contract artifacts and turn them into usable abstractions.
import patient_artifacts from '../../build/contracts/Patient.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Patient = contract(patient_artifacts);

var accounts, account;
var myPatientInstance;

// Initialize
function initializePatient() {
  console.log("initializing patient...");
  console.log("Unlocking account..");
web3.personal.unlockAccount(accounts[0], "BE1010be");
    Patient.setProvider(web3.currentProvider);
	Patient.new({from: accounts[0], gas: 4712386}).then(
	function(patient) {
		console.log(patient);
		myPatientInstance = patient;
    console.log("Patient contract address...." + myPatientInstance.address);
		$("#patientContractAddress").html(myPatientInstance.address);

	});
}

// Check Values
// function checkValues() {
// 	myConferenceInstance.quota.call().then(
// 		function(quota) {
// 			$("input#confQuota").val(quota);
// 			return myConferenceInstance.organizer.call();
// 	}).then(
// 		function(organizer) {
// 			$("input#confOrganizer").val(organizer);
// 			return myConferenceInstance.numRegistrants.call();
// 	}).then(
// 		function(num) {
// 			$("#numRegistrants").html(num.toNumber());
// 			return myConferenceInstance.organizer.call();
// 	});
// }
//
// // Change Quota
// function changeQuota(val) {
// 	myConferenceInstance.changeQuota(val, {from: accounts[0]}).then(
// 		function() {
// 			return myConferenceInstance.quota.call();
// 		}).then(
// 		function(quota) {
// 			if (quota == val) {
// 				var msgResult;
// 				msgResult = "Change successful";
// 			} else {
// 				msgResult = "Change failed";
// 			}
// 			$("#changeQuotaResult").html(msgResult);
// 		});
// }
//
// // Update Patient
function updatePatient(name, dob, gender, condition) {

console.log("Updating patient...");
console.log("update patinet - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");

console.log("Updating patient");

myPatientInstance.setPatient(name, dob, gender, condition, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// 	myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// 		function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     		function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         		function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     		})
// 		});
}

// // Update Patient Name
function updatePatientName(name) {

console.log("Updating patient name...");
console.log("update patinet name- unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setName(name, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient name updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// 	myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// 		function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     		function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         		function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     		})
// 		});
}

// // Update Patient DOB
function updatePatientDOB(dob) {

console.log("Updating patient dob...");
console.log("update patient dob - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient DOB updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// 	myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// 		function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     		function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         		function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     		})
// 		});
}

// // Update Patient Gender
function updatePatientGender(gender) {

console.log("Updating patient gender...");
console.log("update patient gender - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setGender(gender, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient gender updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// // Update Patient Condition
function updatePatientCondition(condition) {

console.log("Updating patient condition...");
console.log("update patient condition - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.addCondition(condition, condition, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient condition updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// Read audit log
function getPatientChangeEventLog(){

//   var patientChangedEventAll = myPatientInstance.PatientChanged({},
//     {address:myPatientInstance.address
//     ,fromBlock: 0, toBlock: 'latest'});
// patientChangedEventAll.get(function(err, logs) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   logs.forEach(function(log) {
//
//     console.log("Key="+ log.args.key + " Value="+ log.args.value);
//
//
//   }
//   //patientChangedEventAll.stopWatching();
//   // append details of result.args to UI
// });



  var logFilter = web3.eth.filter({address:myPatientInstance.address
    , fromBlock:0});
   logFilter.get(function(error, result){
    if(!error){
      console.log("Patient chnage event: " + result);

      var patientLogTable = $("#patientLog");
      var patientLogHtml = "<tr><th>Name</th><th>Name</th><th>DOB</th><th>Gender</th><th>Conditions</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = patient_artifacts.abi;
        var data = ethjsabi.decodeEvent(abi[10], e.data);
        //console.log(data);
        console.log("Decode Data: " + data[0]);

        var pi = web3.eth.contract(abi).at(e.address);

        console.log("Name=" + pi.name.call(e.blockNumber));
        console.log("dateOfBirth=" + pi.dateOfBirth.call(e.blockNumber));
        console.log("gender=" + pi.gender.call(e.blockNumber));

        var name = pi.name.call(e.blockNumber);
        var dob = pi.dateOfBirth.call(e.blockNumber);
        var gender = pi.gender.call(e.blockNumber);
        var conditions = pi.getConditions.call(e.blockNumber);

        patientLogHtml = patientLogHtml + "<tr><td>" + data[0] + "</td><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + conditions + "</td><td>" + e.blockNumber + "</td></tr>";

        // web3.eth.getBlock(e.blockNumber, function(err, block) {
        //   myPatientInstance.name(e.blockNumber, function(err,name) {
        //     myPatientInstance.dateOfBirth(e.blockNumber, function(err,dateOfBirth) {
        //       myPatientInstance.gender(e.blockNumber, function(err,gender) {
        //         // Add an object with all the data so it can be displayed
        //         console.log("Name: " + name);
        //         console.log("DOB: " + dateOfBirth);
        //         console.log("gender: " + gender);
        //
        //       });
        //     });
        //   });
        //   });
      }
    );

    patientLogTable.html(patientLogHtml);
    }
  });


}



window.onload = function() {

console.log("window onload...");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    console.log("accounts : " + accounts);

  	initializePatient();
  });

	// Wire up the UI elements


	$("#updatePatient").click(function() {
		var name = $("#patientName").val();
		var dob = $("#patientDOB").val();
    var gender = $("#patientGender").val();
    var condition = $("#patientCondition").val();
		updatePatient(name, dob, gender, condition);
	});

  $("#updatePatientName").click(function() {

    var name = $("#patientName").val();
		updatePatientName(name);
	});

  $("#updatePatientDOB").click(function() {
		var dob = $("#patientDOB").val();

		updatePatientDOB(dob);

    });

  $("#updatePatientGender").click(function() {

    var gender = $("#patientGender").val();

		updatePatientGender(gender);
	});

  $("#updatePatientCondition").click(function() {

    var condition = $("#patientCondition").val();
		updatePatientCondition(condition);
	});




};
