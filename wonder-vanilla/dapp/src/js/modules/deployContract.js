export default function deployContract(web3, contractInterface, contractCompiled) {
    
    return new Promise(function(resolve, reject) {

        web3.eth.contract(contractInterface).new(
            {
                from: web3.eth.accounts[0], 
                data: contractCompiled, 
                gas: '1234000'
            }, function (err, contract){

                //console.log(err, contract);
                if (err) { 
                    reject(err);
                }

                if (typeof contract.address !== 'undefined') {

                    //console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    resolve(contract);
                }

            });
        
    });
}