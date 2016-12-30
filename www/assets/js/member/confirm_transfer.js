$(document).ready(function () {

        $("#btn_confirm").click(function () {
            window.setTimeout(refresh, 1000);

            sessionStorage.setItem("link",  JSON.stringify(linkcombo));

        });

        var container = document.getElementById("main");
var mc = new Hammer(container);

mc.on("swiperight", function() {
        backpage();
    }); 
mc.on("swipeleft", function() {
        
        $('#myModal').modal('toggle');
    });  


    });

    function refresh() {
//        location.href = '';
        pass_url('member/apps_security.html');
    }

    function backpage() {
//        location.href = '';
        pass_url('member/writemessage_transfer.html');
    }


if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");
        val2 = sessionStorage.getItem("newItem"); 
        val3 = sessionStorage.getItem("newMessage");
        val4 = sessionStorage.getItem("transvalue"); 
        val5 = sessionStorage.getItem("newReceiverId");   
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');

var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];
var type = JSON.parse(val2);
var transvalue = JSON.parse(val4);
var message = JSON.parse(val3);
msg = message.toString().replace(/\s+/g, '%');

userid = JSON.parse(val5);

if (social == "assets/images/ws.png"){
    var via = "Whatsapp";
}else if (social == "assets/images/fb.png"){
    var via = "Facebook";
}else if (social == "assets/images/twitter.png"){
    var via = "Twitter";
}

linkcombo = via+"+"+userid+"+"+type+"+"+transvalue+"+"+msg+"+receive_transaction.html";
link = "http://localhost/scorpion/www/index.html?"+linkcombo;




document.getElementById("link").value = link;
document.getElementById("receiver").value =  name;
document.getElementById("userpic").src =  pic;
document.getElementById("usersocial").src =  social;

document.getElementById("type").value =  type;
document.getElementById("totalweight").value =  transvalue;

document.getElementById("message").value =  message;

}

/*function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4();

    //'-' + chr4() +
    //'-' + chr4() +
    //'-' + chr4() +
    //'-' + chr4() + chr4() + chr4();

}*/

