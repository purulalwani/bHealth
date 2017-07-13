pragma solidity ^0.4.2;

contract Condition {
    // condition id
    string public id;
    // condition description
    string public desc;


    function Condition(string _id, string _desc){
      id = _id;
      desc = _desc;
    }

    // Set condition ID
    function setId(string _id) {

        id = _id;
    }

    // Set condition Description
    function setDesc(string _desc) {

        desc = _desc;
    }
}
