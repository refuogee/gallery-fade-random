//this first if basically checks if this is the page we want this gallery on and if so then execute the code/
  
  if ( (window.location.href.includes('WESBITE URL')) || (window.location.href.includes('WESBITE URL/home')) ){
    console.log('We are on the home page');
    //console.log(window.location.href);
    //console.log(window.location.href.length);
	if ( document.querySelector('.section-background') )	{
		
		node = document.querySelector('.section-background').querySelector('img');
		//node.classList.add('top');
		//x.id="menu"
		node.id="top";
		//console.log(node);
		node.insertAdjacentHTML('beforebegin', '<img id="bottom" src="//image1"></img>');    
		//node.insertAdjacentHTML('afterend', '<div>Sample Div</div>');
			
		/*Logic starts here*/
		//top and bottom image as enumerated types are easier to deal with
		var topImage = 0;
		var bottomImage = 1;
		
		//the array of urls
		var theUrls = [ "//image1",
					"//image2",
					"//image3",
					"//image4",
					"//image5",
					"//image6",
					"//image7",
					"//image8",
					"//image9",
					"//image10",
					"//image11",
					"//image12",				
					"//image13",
					"//image14",
					"//image15",
					"//image16"];
		//End of url array
		
		var theCheck = 0;
		var randomNumber = 0;
		var myTimer = 0;
		var imagesToRemove = [0,1];
		
		var clickCount = 0;
		
		var transitionCount = 0;

		function doTheToggle(){        
				document.querySelector('#top').classList.toggle('transparent');         
		}
		
		function disableImage(){
			document.querySelector(".page-section").style.pointerEvents = 'none';        
		}

		function enableImage(){
			document.querySelector(".page-section").style.pointerEvents = 'auto';
		}
		
		if (myTimer === 0){
		  startTheCountdown();
		} 
		
		//Putting the get random number inside of a function for DRY and ease of use
		function getRandom(){
			var theRandom = Math.floor(Math.random() * theUrls.length);
			return theRandom;
		}
		//The logic to see if an image has occured in one round
		function checkOccured(numberToCheck){

			//console.log('checking if the random number '+ numberToCheck +' has occured');
			//console.log('What is in the array ' + imagesToRemove);
			//console.log('The array contains the next random number ' + imagesToRemove.includes(numberToCheck) );
			
			if ( imagesToRemove.includes(numberToCheck) ) {
				
				//console.log('The next image to be shown has appeared before - deal with this');
				
				while ( imagesToRemove.includes(numberToCheck) ){
					numberToCheck = getRandom();
				   // console.log('Inside while loop and number to check is now ' + numberToCheck);
				} 
			} else {
				//console.log('The number has not been shown var us add it to the array ' + numberToCheck);
				
			}  

			return numberToCheck;
		}
		
		function startTheCountdown(){
		  
		  setInterval(function(){
		  myTimer++;
		  //console.log(myTimer);
		  
			if(myTimer === 4){          
			  //console.log('5 seconds have passed');
			  doTheToggle();
			}
		  }, 1000);
		  
		
		}
	   document.querySelector('.page-section').addEventListener('click',function(){
		  clickCount++;
		  myTimer = 0;
		  doTheToggle();  
		  disableImage();
		});    
		
		
		
		document.querySelector('.page-section').addEventListener('transitionrun',function(){
		  //console.log('transition Run event listener activated');	
		  
		  //console.log('Transition count called in event listener end is ' + transitionCount);
		  
		  if (transitionCount > 1)
			{
			  disableImage();
			}
		});
		
		document.querySelector('#top').addEventListener('transitionend',function(){
		  //console.log('transition end event listener activated');	
		  transitionCount++;        
		  //console.log('Transition count called in event transition END is ' + transitionCount);
		  myTimer=0;
		  enableImage();
		  
		  //console.log('The length of the image array is ' + theUrls.length);
			//console.log('The length of counter array is ' + imagesToRemove.length);
			if ( theUrls.length === imagesToRemove.length ){
				//console.log('The arrays are the same length ');
				imagesToRemove = [];
			}
		  
		  
		  randomNumber = getRandom();
		  
		  if (transitionCount === 1) {
				
				//console.log('initialise')
				
				randomNumber = getRandom(); 
				
				//console.log('The first random number ' + randomNumber);
				//console.log('The bottom image is  ' + bottomImage);
				
			
				/*logic to make sure the first random picture 
				  is not the same as the one we've just seen
				*/
			
				if (randomNumber === bottomImage || randomNumber === topImage) {
					//console.log('The first random image will be the same as first top or bottom image we must change this');
					while ( (randomNumber === bottomImage) || randomNumber === topImage ) {
						randomNumber = getRandom();
										  
					}                    
					document.querySelector('#top').src = theUrls[randomNumber+1];
				}

				else {                
				}
			}//End of same image logic check
		  
		  //Beginning of the image changing logic    
		if ( document.querySelector('#top').classList.contains('transparent') ) { 
		  //console.log('the top image is transparent');
		  topImage = randomNumber;
		  
		  check = checkOccured(randomNumber);
		  //console.log('Check is ' + check);
		  randomNumber = check;
		  
		  document.querySelector('#top').srcset = theUrls[randomNumber];      
		  
		  imagesToRemove.push(randomNumber);
		  //console.log('entire array  ' + imagesToRemove);            
		}
		else {
				//console.log('Current top image is ' + topImage);          
				
				bottomImage = randomNumber;
		  
				check = checkOccured(randomNumber);
				//console.log('Check is ' + check);            
				randomNumber = check;
		  
				document.querySelector('#bottom').src = theUrls[randomNumber];
				
				imagesToRemove.push(randomNumber);
				
			}  
		  
		});    
	}
    
    }//end of url check logic
  else {
    //console.log('We are NOT on the home page');
  }
      
      
</script>

