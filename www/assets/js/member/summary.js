$(document).ready(function () {
		$("#btndone").click(function(){
			pass_url('member/overview.html');
		});
		
		
		/*$("#capture").click(function(){
			alert("Yg ni umar kene buat... ntok screenshot and simpan ke database..ntok reference of history transaction ^_^...");
			msg_alert("Your screenshot already taken and saved.");
		});*/
	});


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'/'+mm+'/'+yyyy;

if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");
        val2 = sessionStorage.getItem("newItem"); 
        val3 = sessionStorage.getItem("newMessage");
        val4 = sessionStorage.getItem("transvalue");   
        val5 = sessionStorage.getItem("link");    
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');

var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];
var type = JSON.parse(val2);
var transvalue = JSON.parse(val4);
var message = JSON.parse(val3);
var link = JSON.parse(val5);

if (social == "assets/images/ws.png"){
	var via = "Whatsapp";
}else if (social == "assets/images/fb.png"){
	var via = "Facebook";
}else if (social == "assets/images/twitter.png"){
	var via = "Twitter";
}

document.getElementById("receiver").innerHTML =  name;
document.getElementById("type").innerHTML =  type;
document.getElementById("totalweight").innerHTML =  transvalue;
document.getElementById("today").innerHTML =  today;
document.getElementById("message").innerHTML =  message;
document.getElementById("via").innerHTML =  via;
document.getElementById("link").innerHTML =  'http://localhost/scorpion/www/member/receive_transaction.html?'+link;

}
