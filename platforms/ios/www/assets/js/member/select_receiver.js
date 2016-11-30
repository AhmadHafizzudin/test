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
    var newReceiverId = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').find('input:hidden').val();

    newReceiver[0] = $('input[name=user]:checked').val();
    newReceiver[1] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').find('img').attr("src");
    newReceiver[2] = $('input[name=user]:checked').parents('div.radio').next().next('div.image1').next('div.image2').find('img').attr("src");


// store array data to the session storage
sessionStorage.setItem("newReceiver",  JSON.stringify(newReceiver));
sessionStorage.setItem("newReceiverId",  JSON.stringify(newReceiverId));


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
if (response.authResponse) { // in case if we are logged in
var userInfo = document.getElementById('user-info');

// get friends
FB.api('/me/taggable_friends?limit=5000?fields=full_picture', function(response) {
var result_holder = document.getElementById('B');
var friend_data = response.data.sort(sortMethod);
var results = '';
var loading = '';


for (var i = 0; i < friend_data.length; i++) {

results += '<div class="chip"><div class="radio" style="display: inline"><label><input type="radio" name="user" value="' + friend_data[i].name + '" id="user5"/></label></div><label for="receiver"></label><div class="image1" style="display: inline"><img src="assets/images/fb.png" id="usersocial5" name="usersocial" height="30px" width="30px"  class="img-circle"/></div><div class="image2" style="display: inline"><img src="'+response.data[i].picture.data.url+'" id="userpic12" name="userpic" width="20%"  class="img-circle"/><input type="hidden" id="userid" value="' + friend_data[i].id + '"></div><label for="user">&nbsp;' + friend_data[i].name + '</label></div>';

if (i<friend_data.length){
    loading = '<div class="loader">';
}

}
// and display them at our holder element

result_holder.innerHTML =  results;
});

} else { // otherwise - dispay login button
    result_holder.innerHTML = '<h2>Load failed</h2>';

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


