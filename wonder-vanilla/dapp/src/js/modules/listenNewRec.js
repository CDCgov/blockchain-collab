
import {default as sendRecToContract } from './sendRecToContract';

export default function listenNewRec(contract) {

    const newRecText = document.getElementById('newRecText');

    document.getElementById('submitNewRec').addEventListener('click', () => {
        
        return sendRecToContract(contract, newRecText.value);
            
    });

}