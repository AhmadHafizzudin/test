
//var URL_SERVER = 'http://localhost/dinarpal_v2/apps/index.php/';
var URL_SERVER = 'http://www.dinarpal.com/apps/index.php/';

//var BASE_URL_SERVER = 'http://localhost/dinarpal_v2/';
var BASE_URL_SERVER = 'http://www.dinarpal.com/';

$(this).mousemove(function (e) {
    $("#alert_msg_box").removeClass("alert alert-success").html("");
    $("#alert_msg_box").removeClass("alert alert-info").html("");
    $("#alert_msg_box").removeClass("alert alert-warning").html("");
    $("#alert_msg_box").removeClass("alert alert-danger").html("");

});
$(this).keypress(function (e) {
    $("#alert_msg_box").removeClass("alert alert-success").html("");
    $("#alert_msg_box").removeClass("alert alert-info").html("");
    $("#alert_msg_box").removeClass("alert alert-warning").html("");
    $("#alert_msg_box").removeClass("alert alert-danger").html("");

});

function msg_alert_clr() {
    $("#alert_msg_box").removeClass("alert alert-success").html("");
    $("#alert_msg_box").removeClass("alert alert-info").html("");
    $("#alert_msg_box").removeClass("alert alert-warning").html("");
    $("#alert_msg_box").removeClass("alert alert-danger").html("");

}

function msg_alert(msg, type) {
    var type_alert = "alert alert-info";
    switch (type) {
        case '1':
        case 1:
            type_alert = "alert alert-success";
            break;
        case '2':
        case 2:
            type_alert = "alert alert-info";
            break;
        case '3':
        case 3:
            type_alert = "alert alert-warning";
            break;
        case '4':
        case 4:
            type_alert = "alert alert-danger";
            break;
            case '5':
        case 5:
            type_alert = "alert alert-custom-red";
            break;
            case '6':
        case 6:
            type_alert = "alert alert-custom-orange";
            break;
            case '7':
        case 7:
            type_alert = "alert alert-custom-blue";
            break;
            case '8':
        case 8:
            type_alert = "alert alert-custom-green";
            break;
    }
    $("#alert_msg_box").addClass(type_alert).html("<center>" + msg + "</center>");
}

function get_pecah(data) {
    return data.split("|");
}