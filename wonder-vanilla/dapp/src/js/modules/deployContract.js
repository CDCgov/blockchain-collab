export default function deployContract(web3, contractInterface, contractCompiled) {
    
    return new Promise(function(resolve, reject) {

        var deployedContract = web3.eth.contract(contractInterface).new(
            {
                from: web3.eth.accounts[0], 
                data: contractCompiled, 
                gas: '1234000'
            }, function (e, contract){

                //console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    //console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                }
            });

        if (deployContract) {
            resolve(deployedContract);
        } else {
            reject(deployedContract);
        }
        
    });
}