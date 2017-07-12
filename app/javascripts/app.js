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
function updatePatient(name, dob, gender) {

console.log("Updating patient...");
console.log("update patinet - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");

console.log("Updating patient");

myPatientInstance.SetPatient(name, dob, gender, {from: accounts[0], gas: 4712387}).then(
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
      var patientLogHtml = "<tr><th>Name</th><th>DOB</th><th>Gender</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = patient_artifacts.abi;
        var data = ethjsabi.decodeEvent(abi[2], e.data);
        //console.log(data);
        console.log("Decode Data: " + data[0]);

        var pi = web3.eth.contract(abi).at(e.address);

        console.log("Name=" + pi.name.call(e.blockNumber));
        console.log("dateOfBirth=" + pi.dateOfBirth.call(e.blockNumber));
        console.log("gender=" + pi.gender.call(e.blockNumber));

        var name = pi.name.call(e.blockNumber);
        var dob = pi.dateOfBirth.call(e.blockNumber);
        var gender = pi.gender.call(e.blockNumber);

        patientLogHtml = patientLogHtml + "<tr><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + e.blockNumber + "</td></tr>";

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

// refundTicket
// function refundTicket(buyerAddress, ticketPrice) {
//
// 		var msgResult;
//
// 		myConferenceInstance.registrantsPaid.call(buyerAddress).then(
// 		function(result) {
// 			if (result.toNumber() == 0) {
// 				$("#refundTicketResult").html("Buyer is not registered - no refund!");
// 			} else {
// 				myConferenceInstance.refundTicket(buyerAddress,
// 					ticketPrice, {from: accounts[0]}).then(
// 					function() {
// 						return myConferenceInstance.numRegistrants.call();
// 					}).then(
// 					function(num) {
// 						$("#numRegistrants").html(num.toNumber());
// 						return myConferenceInstance.registrantsPaid.call(buyerAddress);
// 					}).then(
// 					function(valuePaid) {
// 						if (valuePaid.toNumber() == 0) {
// 							msgResult = "Refund successful";
// 						} else {
// 							msgResult = "Refund failed";
// 						}
// 						$("#refundTicketResult").html(msgResult);
// 					});
// 			}
// 		});
// }
//
// // createWallet
// function createWallet(password) {
//
// 	var msgResult;
//
// 	var secretSeed = lightwallet.keystore.generateRandomSeed();
//
// 	$("#seed").html(secretSeed);
//
// 	lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
//
// 		console.log("createWallet");
//
// 		var keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);
//
// 		// generate one new address/private key pairs
// 		// the corresponding private keys are also encrypted
// 		keystore.generateNewAddress(pwDerivedKey);
//
// 		var address = keystore.getAddresses()[0];
//
// 		var privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
//
// 		console.log(address);
//
// 		$("#wallet").html("0x"+address);
// 		$("#privateKey").html(privateKey);
// 		$("#balance").html(getBalance(address));
//
//
// 		// Now set ks as transaction_signer in the hooked web3 provider
// 		// and you can start using web3 using the keys/addresses in ks!
//
// 		switchToHooked3(keystore);
//
// 	});
// }
//
// function getBalance(address) {
// 	return web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether');
// }
//
// // switch to hooked3webprovider which allows for external Tx signing
// // (rather than signing from a wallet in the Ethereum client)
// function switchToHooked3(_keystore) {
//
// 	console.log("switchToHooked3");
//
// 	var web3Provider = new HookedWeb3Provider({
// 	  host: "http://localhost:8545", // check what using in truffle.js
// 	  transaction_signer: _keystore
// 	});
//
// 	web3.setProvider(web3Provider);
// }
//
// function fundEth(newAddress, amt) {
//
// 	console.log("fundEth");
//
// 	var fromAddr = accounts[0]; // default owner address of client
// 	var toAddr = newAddress;
// 	var valueEth = amt;
// 	var value = parseFloat(valueEth)*1.0e18;
// 	var gasPrice = 1000000000000;
// 	var gas = 50000;
// 	web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value}, function (err, txhash) {
// 	  if (err) console.log('ERROR: ' + err)
// 	  console.log('txhash: ' + txhash + " (" + amt + " in ETH sent)");
// 		$("#balance").html(getBalance(toAddr));
// 	});
// }

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
		updatePatient(name, dob, gender);
	});

	// $("#refundTicket").click(function() {
	// 	var val = $("#ticketPrice").val();
	// 	var buyerAddress = $("#refBuyerAddress").val();
	// 	refundTicket(buyerAddress, web3.toWei(val));
	// });
  //
	// $("#createWallet").click(function() {
	// 	var val = $("#password").val();
	// 	if (!val) {
	// 		$("#password").val("PASSWORD NEEDED").css("color", "red");
	// 		$("#password").click(function() {
	// 			$("#password").val("").css("color", "black");
	// 		});
	// 	} else {
	// 		createWallet(val);
	// 	}
	// });
  //
	// $("#fundWallet").click(function() {
	// 	var address = $("#wallet").html();
	// 	fundEth(address, 1);
	// });
  //
	// $("#checkBalance").click(function() {
	// 	var address = $("#wallet").html();
	// 	$("#balance").html(getBalance(address));
	// });


};
