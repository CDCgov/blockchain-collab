(function (Web3) {
'use strict';

Web3 = Web3 && Web3.hasOwnProperty('default') ? Web3['default'] : Web3;

function web3ConnStatus(web3){

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

function sendRecToBlock(text) {

    const viewRecText = document.getElementById('viewRecText');

    viewRecText.value = text;

}

function listenNewRec(){

    const newRecText = document.getElementById('newRecText');

    document.getElementById('submitNewRec').addEventListener('click', () => {
        
        sendRecToBlock(newRecText.value);
            
    });

}

var web3; 

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

web3ConnStatus(web3);

listenNewRec();

}(Web3));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFwcC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzL21vZHVsZXMvd2ViM0Nvbm5TdGF0dXMuanMiLCIuLi8uLi9zcmMvanMvbW9kdWxlcy9zZW5kUmVjVG9CbG9jay5qcyIsIi4uLy4uL3NyYy9qcy9tb2R1bGVzL2xpc3Rlbk5ld1JlYy5qcyIsIi4uLy4uL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlYjNDb25uU3RhdHVzKHdlYjMpe1xuXG4gICAgdmFyIGNvbm5UZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5UZXh0Jyk7XG4gICAgdmFyIGNvbm5IZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubkhlYWRlcicpO1xuICAgIFxuICAgIGlmKCB3ZWIzLmlzQ29ubmVjdGVkKCkgKSB7XG4gICAgICAgIFxuICAgICAgICBjb25uVGV4dC50ZXh0Q29udGVudCA9ICdPTkNIQUlOJztcbiAgICAgICAgY29ubkhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb25uVGV4dC50ZXh0Q29udGVudCA9ICdPRkZDSEFJTic7XG4gICAgICAgIGNvbm5IZWFkZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNGRjQ5MDAnO1xuXG4gICAgfVxuICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbmRSZWNUb0Jsb2NrKHRleHQpIHtcblxuICAgIGNvbnN0IHZpZXdSZWNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdSZWNUZXh0Jyk7XG5cbiAgICB2aWV3UmVjVGV4dC52YWx1ZSA9IHRleHQ7XG5cbn1cbiIsImltcG9ydCB7ZGVmYXVsdCBhcyBzZW5kUmVjVG9CbG9jayB9IGZyb20gJy4vc2VuZFJlY1RvQmxvY2snO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXN0ZW5OZXdSZWMoKXtcblxuICAgIGNvbnN0IG5ld1JlY1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3UmVjVGV4dCcpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdE5ld1JlYycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgc2VuZFJlY1RvQmxvY2sobmV3UmVjVGV4dC52YWx1ZSk7XG4gICAgICAgICAgICBcbiAgICB9KTtcblxufVxuIiwiaW1wb3J0IHsgZGVmYXVsdCBhcyBXZWIzIH0gZnJvbSAnbGliL3dlYjMubWluJzsgLy9leHRlcm5hbCBkZXAgbG9hZGVkIGluIGluZGV4Lmh0bWxcblxudmFyIHdlYjM7IFxuXG5pZiAodHlwZW9mIHdlYjMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2ViMyA9IG5ldyBXZWIzKHdlYjMuY3VycmVudFByb3ZpZGVyKTtcbn0gZWxzZSB7XG4gICAgLy8gc2V0IHRoZSBwcm92aWRlciB5b3Ugd2FudCBmcm9tIFdlYjMucHJvdmlkZXJzXG4gICAgd2ViMyA9IG5ldyBXZWIzKG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODU0NScpKTtcbn1cblxuaW1wb3J0IHtkZWZhdWx0IGFzIGNoZWNrV2ViM0Nvbm5TdGF0dXMgfSBmcm9tICcuL21vZHVsZXMvd2ViM0Nvbm5TdGF0dXMnO1xuY2hlY2tXZWIzQ29ublN0YXR1cyh3ZWIzKTtcblxuaW1wb3J0IHsgZGVmYXVsdCBhcyBsaXN0ZW5OZXdSZWMgfSBmcm9tICcuL21vZHVsZXMvbGlzdGVuTmV3UmVjJztcbmxpc3Rlbk5ld1JlYygpO1xuXG5cblxuIl0sIm5hbWVzIjpbImNoZWNrV2ViM0Nvbm5TdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQWUsU0FBUyxjQUFjLENBQUMsSUFBSSxDQUFDOztJQUV4QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBRXZELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHOztRQUVyQixRQUFRLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7O0tBRTlDLE1BQU07O1FBRUgsUUFBUSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDbEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDOztLQUVoRDs7OztDQUVKLERDakJjLFNBQVMsY0FBYyxDQUFDLElBQUksRUFBRTs7SUFFekMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7SUFFM0QsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0NBRTVCOztBQ0pjLFNBQVMsWUFBWSxFQUFFOztJQUVsQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUV6RCxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNOztRQUVwRSxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOztLQUVwQyxDQUFDLENBQUM7O0NBRU47O0FDVkQsSUFBSSxJQUFJLENBQUM7O0FBRVQsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7SUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUN6QyxNQUFNOztJQUVILElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztDQUM3RTs7QUFFRCxBQUNBQSxjQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUxQixBQUNBLFlBQVksRUFBRSxDQUFDOzs7OyJ9