$(document).ready(function () {
	var i = 3;
	localStorage.setItem("i",i);
 });


function insert(value){	
	
	if($("#first").html() != "<h3>-</h3>" ){
		if($("#second").html() != "<h3>-</h3>" ){
			if($("#third").html() != "<h3>-</h3>" ){
				var dis4 = value;
				$("#fourth").html("<h3>"+dis4+"</h3>");
				localStorage.setItem("fourth", dis4);
				msg_alert('Authenticating ...', 2);
				 
				window.setTimeout(post, 2500);
				
			}else{
				var dis3 = value;
				$("#third").html("<h3>"+dis3+"</h3>");
				localStorage.setItem("third", dis3);
			}
		}else{
			var dis2 = value;
			$("#second").html("<h3>"+dis2+"</h3>");
			localStorage.setItem("second", dis2);
		}
	}else{
		var dis1 = value;
		$("#first").html("<h3>"+dis1+"</h3>");
		localStorage.setItem("first", dis1);
	}

	
}

function post(){
	
	var verify = false;
	var pwd = localStorage.getItem("first");
	pwd = pwd+localStorage.getItem("second");
	pwd = pwd+localStorage.getItem("third");
	pwd = pwd+localStorage.getItem("fourth");
	localStorage.setItem("pwd", pwd);
	

	$.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/apps_security/checkPinCode/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 
                 success: function(data){
                  
                 var pin = JSON.stringify(data);
                 var newPin = pin.replace(/\D/g,'');
                 
                 
	
	if(pwd == newPin){


		verify = true;
	}
	
	if(verify == true){

			trans();
			msg_alert('Transaction success! You may view the transaction in transaction history. Thank you.',1);
			pass_url('member/summary.html');
 

	}else{

		reset();
		check=chance();
		var i = localStorage.getItem("i");

		if(i!=0){

			msg_alert('Your pin no is incorrect!. You have ' +i+ ' chance left.',4);
			console.log(pwd);

		}else{
			msg_alert('Your transaction is cancelled. You will now been log out automatically by the system',3);
		}if(check == false){

			pass_url('logout.html');
		}
	}


	} // End of success function of ajax form
             }); // End of second ajax call (money)
	
}

function reset(){
	$('#first').html("<h3>-</h3>");
	$('#second').html("<h3>-</h3>");
	$('#third').html("<h3>-</h3>");
	$('#fourth').html("<h3>-</h3>");
}

function del_num(){
	
	if($("#fourth").html() != "<h3>-</h3>" ){
	
		$('#fourth').html("<h3>-</h3>");
	
	}else{
	
		if($("#third").html() != "<h3>-</h3>" )	{
			$('#third').html("<h3>-</h3>");		
		}else{
			
			if($("#second").html() != "<h3>-</h3>" ){
				$('#second').html("<h3>-</h3>");
				
			}else{
				
				if($("#first").html() != "<h3>-</h3>"){
					
					$('#first').html("<h3>-</h3>");

				}else{

					msg_alert('Password already empty',3);
				}
			}
		}
	}
}

function chance (){

	var a = 1;
	var i = localStorage.getItem("i");
	i = (+i) - (+a);
	
	localStorage.setItem("i",i);
	
	if(i=="0"){
	
		return false;
	}
	
	return true;
}

function trans(){


			if(sessionStorage.length > 0) {

    			for (i=0; i<=sessionStorage.length-1; i++)  {   
        			key = sessionStorage.key(i); 

 
        			val = sessionStorage.getItem("newReceiver");
        			val2 = sessionStorage.getItem("newItem"); 
        			val3 = sessionStorage.getItem("newMessage");
        			val4 = sessionStorage.getItem("transvalue");
        			val5 = sessionStorage.getItem("selgold");
        			val6 = sessionStorage.getItem("selsilver");    
    			}
			
			var newVal = val.replace(/[\]\[\"\']+/g,'');

			name = newVal.split(",")[0];
			var social = newVal.split(",")[1];
			var pic = newVal.split(",")[2];
			type = JSON.parse(val2).toString();
			transvalue = JSON.parse(val4);
			message = JSON.parse(val3).toString();

			if (type == "Gold"){
				itemid = JSON.parse(val5).toString();
			}else if (type == "Silver"){
				itemid = JSON.parse(val6).toString();
			}

			if (social == "assets/images/ws.png"){
				via = "Whatsapp";
			}else if (social == "assets/images/fb.png"){
				via = "Facebook";
			}else if (social == "assets/images/twitter.png"){
				via = "Twitter";
			}
			
                
            }

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 


			var yyyy = today.getFullYear();

			if(dd<10) {
    			dd='0'+dd
			} 

			if(mm<10) {
    			mm='0'+mm
			} 

			today = dd+'/'+mm+'/'+yyyy;

            var status = "Pending";
            var sender = localStorage.getItem("username");
            



            $.ajax({
                    type:'post',
                    url: 'http://localhost/dpapps/index.php/apps_security/getTrans',
                    data:{
                    'temp_receiver_name':name,
                    'temp_via':via,
                    'temp_date':today,
                    'temp_type':type,
                    'temp_total':transvalue,
                    'temp_message':message,
                    'temp_status':status,
                    'temp_sender':sender,
                    'temp_itemid':itemid 
                },
                    error: function(error_data){
                 	console.log(error_data);
                 	},
                    success:function(data){
                   	console.log(data);
					}
        });

}



if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");   
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');


var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];


document.getElementById("userpic").src =  pic;

}