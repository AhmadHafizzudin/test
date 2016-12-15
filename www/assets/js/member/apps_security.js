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
			sendDm();
			msg_alert('Transaction success! You may view the transaction in transaction history. Thank you.',1);
			pass_url('member/summary.html');
			//passTwtId();
 

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
        			val7 = sessionStorage.getItem("newReceiverId");
        			val8 = sessionStorage.getItem("newMoney");
        			val9 = sessionStorage.getItem("link");      
    			}
			
			var newVal = val.replace(/[\]\[\"\']+/g,'');

			name = newVal.split(",")[0];
			var social = newVal.split(",")[1];
			var pic = newVal.split(",")[2];
			type = JSON.parse(val2).toString();
			link = JSON.parse(val9).toString();
			
			message = JSON.parse(val3).toString();
			fbid = JSON.parse(val7);

			if (type == "Gold"){
				itemid = JSON.parse(val5).toString();
				transvalue = JSON.parse(val4);
			}else if (type == "Silver"){
				itemid = JSON.parse(val6).toString();
				transvalue = JSON.parse(val4);
			}else if(type == "Money"){
				itemid = "";
				transvalue = JSON.parse(val4);
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
                    'temp_itemid':itemid,
                    'temp_receiver_id':fbid,
                    'temp_unique':link 
                },
                    error: function(error_data){
                 	console.log(error_data);
                 	},
                    success:function(data){
                   	console.log(data);
                   	sendPm();
					}
        });

}



if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");
        val2 = sessionStorage.getItem("newItem"); 
        val3 = sessionStorage.getItem("newMessage");
        val4 = sessionStorage.getItem("transvalue");
     	val5 = sessionStorage.getItem("selgold");
        val6 = sessionStorage.getItem("selsilver");
        val7 = sessionStorage.getItem("newReceiverId");
        val9 = sessionStorage.getItem("link");   
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');


var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];
type = JSON.parse(val2).toString();
transvalue = JSON.parse(val4);
message = JSON.parse(val3).toString();
socialid = JSON.parse(val7);
link = JSON.parse(val9).toString();

document.getElementById("userpic").src =  pic;

/*$.post("http://localhost/dpapps/index.php/apps_security/getTwtData", {
                	'name':name,'type':type,'transvalue':transvalue,'message':message,'socialid':socialid
            }).done(function (data) {
                console.log(data);
            });

}*/

var request = $.ajax({
            url         : "http://localhost/dpapps/index.php/apps_security/getTwtData",
            type        : 'POST',
            ContentType : 'application/json',
            data        : {'name':name,'type':type,'transvalue':transvalue,'message':message,'socialid':socialid,'link':link}, //<------here
        	error: function(error_data) {
            
            console.log(error_data);
 
        },
        success: function(data) {
 			console.log(data);

            } // End of success function of ajax form
        });
        
}

//start fb connection script
function sendPm(){

window.fbAsyncInit = function() {
FB.init({
appId: '1602824146689212',
channelUrl : '//demo.techsirius.com/channel.html', // Channel File 
status: true, 
cookie: true,
xfbml: true,
oauth: true
});
function updateButton(response) {
var button = document.getElementById('fb-auth');
if (response.authResponse) { // in case if we are logged in


// get friends
FB.ui({
			    method: 'send',
			    name: 'Send Private Message to Facebook User using Javascript Facebook API',
			    link: 'http://www.techsirius.com/2012/12/send-private-message-to-facebook-user.html',
			    description: 'In this tutorial I will show you how to send private message to facebook user using Javascript Facebook API. Although it looks very complicated but in real it is very simple, just follow the tutorial.'
   			});

} else { // otherwise - dispay login button
    alert("Not connected");

}
}
// run once with current status and whenever the status changes
FB.getLoginStatus(updateButton);
FB.Event.subscribe('auth.statusChange', updateButton);    
};
(function() {
var e = document.createElement('script'); e.async = true;
e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
//document.getElementById('fb-root').appendChild(e);
}());
//end fb connection script
}


function sendDm(){


	$.ajax({ //get follower from twitter
        url: 'http://localhost/dpapps/index.php/apps_security/sendTwtDm',
        type: 'GET',
        error: function(error_data) {
            
            //console.log(error_data);
            msg_alert("Message sending failed.Please notify the user manually",4);
            
        },
        success: function(data) {

             msg_alert("Message sent to receiver",1);

                

            } // End of success function of ajax form

    }); // End of twt list follower

}//end of sendDm()



