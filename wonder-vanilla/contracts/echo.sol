pragma solidity ^0.4.8;

contract Echo {

    function echoString(string instr) returns (address, bytes32, string) {
        
        address contractAddress = this;

        bytes32 _sha256 = sha256(instr);

        return (contractAddress, _sha256, instr);
    }
    
}

//echo.sol -> https://remix.ethereum.org || solc --bin -> dapp/src/js/contracts/echo.js