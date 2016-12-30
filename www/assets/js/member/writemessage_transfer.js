$(document).ready(function () {

var container = document.getElementById("main");
var mc = new Hammer(container);

mc.on("swiperight", function() {
        backpage();
    }); 
mc.on("swipeleft", function() {
        
        validateForm();
    });     

});
  


   $("[data-toggle='toggle']").click(function () {
       var selector = $(this).data("target");
       $(selector).toggleClass('in');
   });

   function readURL(input) {
    var $prev = $('#item'); // cached for efficiency

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $prev.attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);

        $prev.show(); // this will show only when the input has a file
    } else {
        $prev.hide(); // this hides it when the input is cleared
    }
}

function backpage(){
    pass_url('member/sendpayment.html');
}  

function validateForm() {
    var x = document.forms["myForm"]["message"].value;

    if (x == null || x == "") {
        msg_alert('Please write your message', 6);
        return false;
        x.focus();

    }else{

    var newMessage = new Array();
    

    newMessage[0] = document.getElementById("message").value;  

// store array data to the session storage
sessionStorage.setItem("newMessage",  JSON.stringify(newMessage));

//Use JSON to retrieve the stored data and convert it 
var storedData = sessionStorage.getItem("newMessage");
if (storedData) {
  newMessage = JSON.parse(storedData);
}
      pass_url('member/confirm_transfer.html');
    
}    
}


if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");
        val2 = sessionStorage.getItem("newItem"); 
        val3 = sessionStorage.getItem("selgold");
        val4 = sessionStorage.getItem("selsilver"); 
        val5 = sessionStorage.getItem("transvalue");      
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');
var newVal3 = val2.replace(/[\]\[\"\']+/g,'');
var newVal4= [];
var newVal5= [];
newVal4 = JSON.parse(val3);
newVal5 = JSON.parse(val4);
newVal6 = JSON.parse(val5);

var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];
var type = JSON.parse(val2);


document.getElementById("receiver").value =  name;
document.getElementById("userpic").src =  pic;
document.getElementById("usersocial").src =  social;

document.getElementById("type").value =  type;
var total = 0;

var newType = document.getElementById("type").value;

if (newType == "Gold"){

$.ajax({ //display list of gold
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllGold/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){

                $.each(data.results, function(index,item){
                
                  for (var i = 0; i < newVal4.length; i++) {
                    
                        if (newVal4[i] == item.gacc_id) {
                            total += parseFloat(item.gacc_weight);
                        }
                    
                }
                

                });  
                              
                 
// store array data to the session storage
sessionStorage.setItem("transvalue",  JSON.stringify(total));


document.getElementById("totalweight").value =  total;

} // End of success function of ajax form
             }); // End of second ajax call (gold)

}else if(newType == "Silver"){

  $.ajax({ //display list of gold
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllSilver/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){

                $.each(data.results, function(index,item){
                
                  for (var i = 0; i < newVal5.length; i++) {
                    
                        if (newVal5[i] == item.sacc_id) {
                            total += parseFloat(item.sacc_weight);
                        }
                    
                }
                

                });  
                              
// store array data to the session storage
sessionStorage.setItem("transvalue",  JSON.stringify(total));

document.getElementById("totalweight").value =  total;

} // End of success function of ajax form
             }); // End of second ajax call (gold)

}else if (newType == "Money"){



  document.getElementById("totalweight").value =  newVal6;

  //sessionStorage.setItem("transvalue",  JSON.stringify(newVal6));


}

}

