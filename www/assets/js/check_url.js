//temp_url = window.location.href;
//var pecah_url = temp_url.split("?");
//temp_page = "login.html";
//if (typeof pecah_url[1] !== 'undefined') {
//    var pecah_var_url = pecah_url[1].split("&");
//    for (iv=0; iv<pecah_var_url.length; iv++) {
//        var var_temp = pecah_var_url[iv];
//        var pecah_var_temp = var_temp.split("=");
//        if (pecah_var_temp[0] == 'page') {
//            if (typeof pecah_var_temp[1] !== 'undefined') {
//                temp_page = pecah_var_temp[1];
//            }
//        }
//    }
//}
//localStorage.setItem("link_temp", temp_page);

function pass_url(page) {
    var adopt = $("#adopted3");
    
    adopt.attr("l", page);
    adopt.load(page);
    
//    $("#adopted3").animate({
//        right: '200px',
//        left: '-200px',
//        opacity: '0.0'
//    }, 100, function () {
//    }).animate({
//        right: '100px',
//        left: '-100px',
//        opacity: '0.0'
//    }, 200).animate({
//        right: '-100px',
//        left: '100px',
//        opacity: '0.3'
//    }, 300).animate({
//        right: '0px',
//        left: '0px',
//        opacity: '1.0'
//    }, 200);
    
    localStorage.setItem("link_temp", page);
}

function change_title(title_page) {
    var tp = $("#adopted2");
    tp.attr("l", title_page);
    tp.load(title_page);
}