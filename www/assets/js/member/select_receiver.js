$(document).ready(function () {

        /* if my var reload isn't set locally.. in the first time it will be true */
        if (!localStorage.getItem("reload")) {
        /* set reload locally and then reload the page */
        localStorage.setItem("reload", "true");
        location.reload();
        }
        /* after reload clear the localStorage */
        else {
        localStorage.removeItem("reload");
        // localStorage.clear(); // an option
        }


        var $searchBox = $('#searchbox');
        var $userDivs = $('.tabcontent .chip');

$searchBox.on('input', function() {
  var scope = this;
  if (!scope.value || scope.value == '') {
    $userDivs.show();
    return;
  }

  $userDivs.each(function(i, div) {
    var $div = $(div);
    var $text = $div.find('.name').first().text().toLowerCase();
    $div.toggle($text.indexOf(scope.value.toLowerCase()) > -1);
  })
});


var container = document.getElementById("main");
var mc = new Hammer(container);

mc.on("swiperight", function() {
        backpage();
    }); 
mc.on("swipeleft", function() {
        
        validateForm();
    });     

});


function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

function backpage(){
    pass_url('member/overview.html');
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
 msg_alert('Please select a contact', 6);
        return false;
        x.focus();
}else{

    var newReceiver = new Array();
    var newReceiverId = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').find('input:hidden').val();
    var newReceiverScreen = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').next('div.data3').find('input:hidden').val();
    newReceiver[0] = $('input[name=user]:checked').val();
    newReceiver[1] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').find('img').attr("src");
    newReceiver[2] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').find('img').attr("src");


// store array data to the session storage
sessionStorage.setItem("newReceiver",  JSON.stringify(newReceiver));
sessionStorage.setItem("newReceiverId",  JSON.stringify(newReceiverId));
sessionStorage.setItem("newReceiverScreen",  JSON.stringify(newReceiverScreen)); // dpt kn username dari api (stakat ini hanya boleh untuk twitter)



}

pass_url('member/sendpayment.html');

}



//start fb connection script

function sortMethod(a, b) {
var x = a.name.toLowerCase();
var y = b.name.toLowerCase();
return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
window.fbAsyncInit = function() {
FB.init({
appId: '1602824146689212', 
status: true, 
cookie: true,
xfbml: true,
oauth: true
});
function updateButton(response) {
var button = document.getElementById('fb-auth');
var result_holder = document.getElementById('B');
if (response.authResponse) { // in case if we are logged in
var userInfo = document.getElementById('user-info');

// get friends
FB.api('/me/taggable_friends?limit=5000?fields=full_picture', function(response) {

var friend_data = response.data.sort(sortMethod);
var results = '';
var loading = '';


for (var i = 0; i < friend_data.length; i++) {

results += '<div class="chip"><div class="radio" style="display: inline"><label><input type="radio" name="user" value="' + friend_data[i].name + '" id="user5"/></label></div><label for="receiver"></label><div class="image1" style="display: inline"><img src="assets/images/fb.png" id="usersocial5" name="usersocial" height="30px" width="30px"  class="img-circle"/></div><div class="image2" style="display: inline"><img src="'+response.data[i].picture.data.url+'" id="userpic12" name="userpic" width="20%"  class="img-circle"/><input type="hidden" id="userid" value="' + friend_data[i].id + '"></div><label for="user" class="name">&nbsp;' + friend_data[i].name + '</label></div><p></p>';

if (i<friend_data.length){
    loading = '<div class="loader">';
}

}
// and display them at our holder element

result_holder.innerHTML =  results;
});

} else { // otherwise - dispay login button
    result_holder.innerHTML = '<h4>Please connect your Facebook account</h4>';

}
}
// run once with current status and whenever the status changes
FB.getLoginStatus(updateButton);
FB.Event.subscribe('auth.statusChange', updateButton);    
};
(function() {
var e = document.createElement('script'); e.async = true;
e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
document.getElementById('fb-root').appendChild(e);
}());
//end fb connection script



//twitter follower script

    $.ajax({ //get follower from twitter
        url: 'http://localhost/dpapps/index.php/select_receiver/twtSession',
        type: 'POST',
        dataType: 'json',
        error: function(error_data) {
            
            console.log(error_data)
            
        },
        success: function(data) {
           
               //console.log(data);

               if (data == "false"){
                sessionStorage.setItem("twitter",data);

               }else if(data == "true"){
                sessionStorage.setItem("twitter",data);
               }

            } // End of success function of ajax form

    }); // End of second ajax call (silver)



twtresult = '';
var twt_holder = document.getElementById('A');
var twtsession = sessionStorage.getItem("twitter");

if (twtsession == "false"){
    twt_holder.innerHTML = '<h4>Please connect your Twitter account</h4>';
}else{


       $.ajax({ //get follower from twitter
        url: 'http://localhost/dpapps/index.php/select_receiver/getTwtFollower',
        type: 'POST',
        dataType: 'json',
        error: function(error_data) {
            
            //console.log(error_data);
            msg_alert("Cannot load Twitter data.Please refresh page",5);
            
        },
        success: function(data) {

             $.each(data, function(index,item){

                twtresult += '<div class="chip"><div class="radio" style="display: inline"><label><input type="radio" name="user" value="' + item.name + '" id="user5"/></label></div><label for="receiver"></label><div class="image1" style="display: inline"><img src="assets/images/twitter.png" id="usersocial5" name="usersocial" height="30px" width="30px"  class="img-circle"/></div><div class="image2" style="display: inline"><img src="'+item.profile_image_url.replace('_normal', '_bigger')+'" id="userpic12" name="userpic" width="20%"  class="img-circle"/><input type="hidden" class="userid" id="userid" value="' + item.id_str + '"></div><div class="data3" style="display: inline"><input type="hidden" id="userscreen" value="' + item.screen_name + '"></div><label for="user" class="name">&nbsp;' + item.name + '</label></div><p></p>';


                });

                //if (twtsession == "true"){ 

                twt_holder.innerHTML =  twtresult; 

            //}
            } // End of success function of ajax form

    }); // End of twt list follower

}





//end twitter follower list