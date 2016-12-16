$(document).ready(function () {

        $("#btn_confirm").click(function () {
            window.setTimeout(refresh, 1000);
            sessionStorage.setItem("link",  JSON.stringify(uniqueID()));
        });


    });

    function refresh() {
//        location.href = '';
        pass_url('member/apps_security.html');
    }


if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");
        val2 = sessionStorage.getItem("newItem"); 
        val3 = sessionStorage.getItem("newMessage");
        val4 = sessionStorage.getItem("transvalue");    
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');

var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];
var type = JSON.parse(val2);
var transvalue = JSON.parse(val4);
var message = JSON.parse(val3);
link = "http://localhost/scorpion/www/receive_transaction.html?"+uniqueID();




document.getElementById("link").value = link;
document.getElementById("receiver").value =  name;
document.getElementById("userpic").src =  pic;
document.getElementById("usersocial").src =  social;

document.getElementById("type").value =  type;
document.getElementById("totalweight").value =  transvalue;

document.getElementById("message").value =  message;

}

function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() + chr4() + chr4();
    //'-' + chr4() +
    //'-' + chr4() +
    //'-' + chr4() +
    //'-' + chr4() + chr4() + chr4();
}