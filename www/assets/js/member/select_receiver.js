function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

function validateForm() {
    var x = document.getElementsByName("user");
    var c = -1

for(var i=0; i < x.length; i++){
   if(x[i].checked) {
      c = i; 
   }
}

if (c == -1){
 msg_alert('Please select a contact', 3);
        return false;
        x.focus();
}else{

    var newReceiver = new Array();

    newReceiver[0] = $('input[name=user]:checked').val();
    newReceiver[1] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').find('img').attr("src");
    newReceiver[2] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').find('img').attr("src");


// store array data to the session storage
sessionStorage.setItem("newReceiver",  JSON.stringify(newReceiver));

//Use JSON to retrieve the stored data and convert it 
var storedData = sessionStorage.getItem("newReceiver");
if (storedData) {
  newReceiver = JSON.parse(storedData);
}
pass_url('member/sendpayment.html');
}
}


