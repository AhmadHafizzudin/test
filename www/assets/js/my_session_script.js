
var username = localStorage.getItem("username");
var password = localStorage.getItem("password");
var uid = localStorage.getItem("uid");
var loggedin = localStorage.getItem("loggedin");

if (loggedin == "false") {
    location.href = '../index.html';
}

$(document).ready(function () {
    $(".btn_logout").click(function () {
        location.href = '../logout.html';
    }); 
});