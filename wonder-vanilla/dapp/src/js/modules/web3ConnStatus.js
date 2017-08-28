export default function web3ConnStatus(web3){

    var connText = document.getElementById('connText');
    var connHeader = document.getElementById('connHeader');
    
    if( web3.isConnected() ) {
        
        connText.textContent = 'ONCHAIN';
        connHeader.style.backgroundColor = 'green';

    } else {

        connText.textContent = 'OFFCHAIN';
        connHeader.style.backgroundColor = '#FF4900';

    }
    
}