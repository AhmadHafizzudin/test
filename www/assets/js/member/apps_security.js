$(document).ready(function () {
	var i = 3;
	localStorage.setItem("i",i);



//facebook api code (wajib)
/*	(function(d){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.net/en_US/all.js";
       ref.parentNode.insertBefore(js, ref);
}(document));	

window.fbAsyncInit = function() {
FB.init({
appId: '1602824146689212',
channelUrl : 'www.dinarpal.com', // Channel File 
status: true, 
cookie: true,
xfbml: true,
oauth: true
});
};*/
//end fb code api

 });


function insert(value) {

        if ($("#first").html() != "<h3>-</h3>") {
            if ($("#second").html() != "<h3>-</h3>") {
                if ($("#third").html() != "<h3>-</h3>") {
                    var dis4 = value;
                    $("#fourth").html("<h3>" + dis4 + "</h3>");
                    localStorage.setItem("fourth", dis4);
                    $("#fourth").html("<h3>*</h3>");
                    msg_alert('Authenticating ...', 2);
				 
					window.setTimeout(post, 2500);

                } else {
                    var dis3 = value;
                    $("#third").html("<h3>" + dis3 + "</h3>");
                    localStorage.setItem("third", dis3);
                    $("#third").html("<h3>*</h3>");
                }
            } else {
                var dis2 = value;
                $("#second").html("<h3>" + dis2 + "</h3>");
                localStorage.setItem("second", dis2);
                $("#second").html("<h3>*</h3>");
            }
        } else {
            var dis1 = value;
            $("#first").html("<h3>" + dis1 + "</h3>");
            localStorage.setItem("first", dis1);
            $("#first").html("<h3>*</h3>");
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

		if(sessionStorage.length > 0) {

    			for (i=0; i<=sessionStorage.length-1; i++)  {   
        			key = sessionStorage.key(i); 

 
        			val = sessionStorage.getItem("newReceiver");
    
    			}
			
			var newVal = val.replace(/[\]\[\"\']+/g,'');
			var social = newVal.split(",")[1];




			if (social == "assets/images/ws.png"){
				via = "Whatsapp";
			}else if (social == "assets/images/fb.png"){
				via = "Facebook";
			}else if (social == "assets/images/twitter.png"){
				via = "Twitter";
			}
			
                
            }
			

			if (via == "Twitter"){

				trans();
				sendDm();
			msg_alert('Transaction success! You may view the transaction in transaction history. Thank you.',1);
			pass_url('member/summary.html');

			}else{
				trans();
				msg_alert('Transaction success! You may view the transaction in transaction history. Thank you.',1);
			pass_url('member/summary.html');
			}
 

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

function trans(){ // hanya untuk twitter..kalo guna fb akan dpt error sbb x boleh fecth username dari fb api


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
        			val10 = sessionStorage.getItem("newReceiverScreen");      

    			}
			
			var newVal = val.replace(/[\]\[\"\']+/g,'');

			name = newVal.split(",")[0];
			var social = newVal.split(",")[1];
			var pic = newVal.split(",")[2];
			type = JSON.parse(val2).toString();
			link = JSON.parse(val9).toString();
			
			message = JSON.parse(val3).toString();
			fbid = JSON.parse(val7);
			username = JSON.parse(val10);

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

                    'temp_unique':link,
                    'temp_receiver_username': username

                },
                    error: function(error_data){
                 	console.log(error_data);
                 	},
                    success:function(data){
                   	console.log(data);
                   	//sendPm();
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
/*function sendPm(){


window.mobilecheck = function() { 
	var check = false;
  	(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

	// Mobile friendly share dialog
if(mobilecheck == true) {
	shareurl = "https://www.facebook.com/dialog/share?app_id=147042669102639&display=popup&href=https://dinarpal.com/&redirect_uri=https://dinarpal.com/";
	window.open(shareurl);
}
else // Use new FB.ui share method
{
	FB.ui(
	{
		method: 'share',
		//mobile_iframe: true,
		href: 'https://dinarpal.com/',
		display: 'popup' 
	}, function(response){});
}


//end fb connection script
}*/


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


