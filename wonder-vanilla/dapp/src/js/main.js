import { default as Web3 } from 'lib/web3.min'; //external dep loaded in index.html

var web3; // web3js
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

import {default as checkWeb3ConnStatus } from './modules/web3ConnStatus';    
checkWeb3ConnStatus(web3);

import { default as echoContract } from './contracts/echo.js';
import { default as deployContract } from './modules/deployContract';
import { default as listenNewRec } from './modules/listenNewRec';

var contract = deployContract(web3, echoContract.interface, echoContract.bytecodeData);

contract.then( (contract) => {
    
    listenNewRec(contract);

});
