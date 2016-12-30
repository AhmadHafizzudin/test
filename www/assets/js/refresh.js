//grab the list
/*
       var listing = document.getElementById("touchlist");
       //grab the loading div
       if (listing.length === null || listing.length !== null || listing.length!== 0 || listing.length !== "" || listing.length < 1) {
       var loader = document.getElementById("touchloader");
       //keep the state whether the fingers are touched
       
       var isTouched = false;
       //keep the state whether a PULL actually went out
       var isMoved = false;
       //This has the original Top offset (relative to screen) position of the list
       var prevY = parseInt(listing.offsetTop);      
       //This has the original Top CSS position of the list
       var cssY = listing.style.top;
       cssY = parseInt(cssY.substring(0,cssY.length - 2));
       
       //Add the start of the touching
       listing.addEventListener("touchstart",function(e){
           //touch started ? YES
           isTouched = true;
           //initialize the touched point
           prevY = e.changedTouches[0].clientY;
           //we use css3 transitions when available for smooth sliding
           listing.style.transition = "";
           e.preventDefault();
       },false);
       listing.addEventListener("touchend",function(e){
           //on touchup we cancel the touch event
           isTouched = false;
           //now if the list has moved downwards, it should come up but in a transition
           listing.style.transition = "top 1s";
           if(isMoved){
               //show the loader div
               loader.style.display = "block";
               loadNewData();
           }
           listing.style.top = cssY + 'px';                            
           isMoved = false;
           
           e.preventDefault();
       },false);
       listing.addEventListener("touchmove",function(e){
           if(isTouched){
               if(e.changedTouches[0].clientY > prevY){
                //on touchmove, we add the exact amount fingers moved to the top of the list
                var change = e.changedTouches[0].clientY - prevY;                  
                //and add it to the style
                listing.style.top = cssY + change + 'px';
                isMoved = true;
               }
           }
           e.preventDefault();
       },false);
       
       
       //binding mouse events to make this work in desktop browsers as well
       listing.addEventListener("mousedown",function(e){
           isTouched = true;
           prevY = e.clientY;
           listing.style.transition = "";
           e.preventDefault();
       },false);
       listing.addEventListener("mouseup",function(e){
           isTouched = false;
           
           listing.style.transition = "top 1s";
           if(isMoved){
               loader.style.display = "block";
               loadNewData();

           }
           listing.style.top = cssY + 'px';                            
           isMoved = false;
           
           e.preventDefault();
       },false);
       listing.addEventListener("mousemove",function(e){
           if(isTouched){
               if(e.clientY > prevY){
                var change = e.clientY - prevY;                  
                listing.style.top = cssY + change + 'px';
                isMoved = true;
               }
           }
           e.preventDefault();
       },false);


       }
       function loadNewData(){
          setTimeout(function(){
                
       
                loader.style.display = "none";

           },1000);
         
         
       }*/

    function refresh(){
        
if (!localStorage.getItem("reload")) {
        /* set reload locally and then reload the page */
        localStorage.setItem("reload", "true");
        location.reload();
        }else {
        localStorage.removeItem("reload");
        // localStorage.clear(); // an option
        }
      }   