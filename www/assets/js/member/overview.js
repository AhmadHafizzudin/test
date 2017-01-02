$(document).ready(function() {
                   
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
   
/*$("#urlfb").keydown(function(e) {
    var oldvalue=$(this).val();
    var field=this;
    setTimeout(function () {
        if(field.value.indexOf('https://www.facebook.com/') !== 0) {
            $(field).val(oldvalue);
        } 
    }, 1);
});

$("#urltwt").keydown(function(e) {
    var oldvalue=$(this).val();
    var field=this;
    setTimeout(function () {
        if(field.value.indexOf('https://twitter.com/') !== 0) {
            $(field).val(oldvalue);
        } 
    }, 1);
});*/

        var user = localStorage.getItem("username");

        if (user != null || user !=""){

            $.post("http://localhost/dpapps/index.php/overview/getUserSession/", {
                usersession: user
            }).done(function (data) {
                //alert(data);
            });

//get dst setting

$.ajax({ //check social
                 url: 'http://localhost/dpapps/index.php/overview/checkSetting/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                    console.log(data);
                    if (data.results.length === 0) {
            $('#modsocial').modal('show'); 
          } else {
            $.each(data.results, function(index, item) {
              pin = item.members_pin_no;
              twturl = item.members_twt;
              fburl = item.members_fb;
            });


            /*if (twturl == "" || fburl == "" || twturl == null || fburl == null){
                $('#modsocial').modal('show');
            }else*/ 

            if(pin == "" || pin == null){
                 $('#modpin').modal('show');
            }
               }  
                 } // End of success function of ajax form
             }); // End of second ajax call (social)

//end get dst setting


//get account overview
   
            $.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/overview/viewMoneyBalance/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(results){
                 var newVal = JSON.stringify(results).replace(/[^0-9.]/g, "");
                 $('#moneybalance').val(newVal);
                 } // End of success function of ajax form
             }); // End of second ajax call (money)

            $.ajax({ //display gold overview
                 url: 'http://localhost/dpapps/index.php/overview/viewAllGold/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(results){

                 var newVal = JSON.stringify(results).replace(/[^0-9.,]/g, "");
                 var goldpieces = newVal.split(",")[1];
                 var goldweight = newVal.split(",")[0]; 
                 $('#goldbalance').val(goldweight);
                 $('#goldpieces').val(goldpieces);
                 } // End of success function of ajax form
             }); // End of second ajax call (gold)

            $.ajax({ //display silver overview
                 url: 'http://localhost/dpapps/index.php/overview/viewAllSilver/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(results){
                 var newVal = JSON.stringify(results).replace(/[^0-9.,]/g, "");
                 $('#silverbalance').val(newVal);
                 var silverpieces = newVal.split(",")[1];
                 var silverweight = newVal.split(",")[0]; 
                 $('#silverbalance').val(silverweight);
                 $('#silverpieces').val(silverpieces);
                 } // End of success function of ajax form
             }); // End of second ajax call (silver)


            //end get account overview

       }else{
        pass_url("login.html");
       }




   
});


 function insert(value) {

        if ($("#first").html() != "<h3>-</h3>") {
            if ($("#second").html() != "<h3>-</h3>") {
                if ($("#third").html() != "<h3>-</h3>") {
                    var dis4 = value;
                    $("#fourth").html("<h3>" + dis4 + "</h3>");
                    localStorage.setItem("fourth", dis4);
                    $("#fourth").html("<h3>*</h3>");

                } else {
                    var dis3 = value;
                    $("#third").html("<h3>" + dis3 + "</h3>");
                    localStorage.setItem("third", dis3);
                    $("#third").html("<h3>*</h3>");
                }
            } else {
                var dis2 = value;
                $("#second").html("<h3>" + dis2 + "</h3>");
                localStorage.setItem("second", dis2);
                $("#second").html("<h3>*</h3>");
            }
        } else {
            var dis1 = value;
            $("#first").html("<h3>" + dis1 + "</h3>");
            localStorage.setItem("first", dis1);
            $("#first").html("<h3>*</h3>");
        }


    }



    function reset() {
        $('#first').html("<h3>-</h3>");
        $('#second').html("<h3>-</h3>");
        $('#third').html("<h3>-</h3>");
        $('#fourth').html("<h3>-</h3>");
    }

    function del_num() {

        if ($("#fourth").html() != "<h3>-</h3>") {
            $('#fourth').html("<h3>-</h3>");
        } else {
            if ($("#third").html() != "<h3>-</h3>") {
                $('#third').html("<h3>-</h3>");
            } else {
                if ($("#second").html() != "<h3>-</h3>") {
                    $('#second').html("<h3>-</h3>");

                } else {
                    if ($("#first").html() != "<h3>-</h3>") {
                        $('#first').html("<h3>-</h3>");
                    } else {
                        msg_alert('Pin code already empty', 7);
                    }
                }
            }
        }
    }

    function chance() {
        var a = 1;
        var i = localStorage.getItem("i");
        i = (+i) + (+a);

        localStorage.setItem("i", i);
        if (i == "3") {
            return false;
        }

        return true;
    }

function submitPin() {


        var pwd = localStorage.getItem("first");
        pwd = pwd + localStorage.getItem("second");
        pwd = pwd + localStorage.getItem("third");
        pwd = pwd + localStorage.getItem("fourth");
        localStorage.setItem("pwd", pwd);

        var user = localStorage.getItem("username");

        $.ajax({
            type: 'post',
            url: 'http://localhost/dpapps/index.php/overview/getPin',
            data: {
                'members_pin_no': pwd,
                'members_username': user
            },
            error: function(error_data) {
                console.log(error_data);
            },
            success: function(data) {
                //console.log(data);
                msg_alert('Pin code updated', 8);
                pass_url('member/overview.html');
            }
        });

    }

    /*function submitSocial() {

        twt = $("#urltwt").val();
        fb = $("#urlfb").val();
        user = localStorage.getItem("username");

        if (twt == "https://twitter.com/" || fb == "https://www.facebook.com/"){

            bootstrap_alert.danger('Do not leave blank!');

        }else{


        $.ajax({
            type: 'post',
            url: 'http://localhost/dpapps/index.php/overview/getSocial',
            data: {
                'members_twt': twt,
                'members_fb': fb,
                'members_username': user
            },
            error: function(error_data) {
                console.log(error_data);
            },
            success: function(data) {
                console.log(data);
                msg_alert('Social Media account updated', 8);
                pass_url('member/overview.html');
            }
        });

    }
    }*/

    bootstrap_alert = function() {}
bootstrap_alert.danger = function(message) {
  $('#alert_placeholder').html('<center><div id="alertdiv" class="alert alert-danger alert-dismissable"><span>' + message + '</span></div></center>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
