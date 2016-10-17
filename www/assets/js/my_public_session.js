
var username = localStorage.getItem("username");
var password = localStorage.getItem("password");
var uid = localStorage.getItem("uid");
var loggedin = localStorage.getItem("loggedin");

if (loggedin == "false") {
//    location.href = '../index.html';
    pass_url('login.html');
} else {
//    change_title('member/title.html');
//    change_menubar('member/menubar.html');
}


$(document).ready(function () {
    $(".btn_logout").click(function () {
//        location.href = '../logout.html';
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        localStorage.setItem("uid", "");
        localStorage.setItem("loggedin", false);
        change_title('title.html');
        change_menubar('menubar.html');
        pass_url('logout.html');
    }); 
});
