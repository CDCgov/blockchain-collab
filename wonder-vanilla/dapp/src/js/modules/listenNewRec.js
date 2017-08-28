import {default as sendRecToBlock } from './sendRecToBlock';

export default function listenNewRec(){

    const newRecText = document.getElementById('newRecText');

    document.getElementById('submitNewRec').addEventListener('click', () => {
        
        sendRecToBlock(newRecText.value);
            
    });

}
