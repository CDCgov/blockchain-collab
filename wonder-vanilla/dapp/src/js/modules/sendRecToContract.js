export default function sendRecToContract(contract, record) {

    const viewRecText = document.getElementById('viewRecText');

    //call contract
    contract.echoString.call(record, (err, res) => {

        //view return
        viewRecText.value = err || `contract called: ${res[0]}\nsha256 of record: ${res[1]}\nrecord sent: ${res[2]}` ;
    
    }); 

}
