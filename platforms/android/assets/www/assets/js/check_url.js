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
    
    adopt.hide(0).load(page, function () {
        adopt.fadeIn(500).css("display", "block");
    });
    
    localStorage.setItem("link_temp", page);
}

function change_title(title_page) {
    var tp = $("#adopted2");
    tp.attr("l", title_page);
    tp.load(title_page);
}

function change_menubar(bar_page) {
    var mb = $("#adopted5");
    mb.attr("l", bar_page);
    mb.load(bar_page);
}