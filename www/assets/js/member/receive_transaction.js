$(document).ready(function() {
  var url = window.location.href;
  id = url.substring(url.lastIndexOf('?') + 1); // get id inside url*/
  $.post("http://localhost/dpapps/index.php/receive_transaction/getUrlId/", {
    urlid: id
  }).done(function(data) {
    $.ajax({ //check money money balance
      url: 'http://localhost/dpapps/index.php/receive_transaction/viewTransDetail/',
      type: 'POST',
      dataType: 'json',
      error: function(error_data) {
        console.log(error_data);
      },
      success: function(data) {
          $.each(data.results, function(index, item) {
            document.getElementById("receiver").innerHTML = item.temp_sender;
            document.getElementById("type").innerHTML = item.temp_type;
            document.getElementById("totalweight").innerHTML = item.temp_total;
            document.getElementById("today").innerHTML = item.temp_date;
            document.getElementById("message").innerHTML = item.temp_message;
            document.getElementById("via").innerHTML = item.temp_via;
            document.getElementById("tempid").value = item.temp_id;
          });
        } // End of success function of ajax form
    }); // End of second ajax call (money)
  });
});
$("#btn_reg").click(function() {
  //            location.href = 'index.html?page=registration.html';
  pass_url("registration.html");
});
$("#btn_login").click(function() {
  var user = $("#user").val();
  var pwd = $("#pwd").val();
  if (user == '' || pwd == '') {
    //alert('Do not leave blank!');
    bootstrap_alert.danger('Do not leave blank!');
  }
  $.post("http://localhost/dpapps/index.php/receive_transaction/getLoginDetail/", {
    username: user,
    password: pwd
  }).done(function(data) {
    $.ajax({ //check money money balance
      url: 'http://localhost/dpapps/index.php/receive_transaction/checkLogin/',
      type: 'POST',
      dataType: 'json',
      error: function(error_data) {
        bootstrap_alert.danger('There is something wrong with our server');
      },
      success: function(data) {
          if (data.results.length === 0) {
            bootstrap_alert.danger("Incorrect username or password");
          } else {
            /* $.each(data.results, function(index, item) {
               bootstrap_alert.success(item.members_email);
             });*/
            var tempid = $("#tempid").val();
            var status = "Complete";
            $.post("http://localhost/dpapps/index.php/receive_transaction/updateTrans/", {
              temp_id: tempid,
              temp_status: status
            }).done(function(data) {
              bootstrap_alert.success("Transaction success.Please check your account");

              


              
            });
          }
        } // End of success function of ajax form
    }); // End of second ajax call (money)
  });
  //bootstrap_alert.info('Authenticating ...');
});
bootstrap_alert = function() {}
bootstrap_alert.danger = function(message) {
  $('#alert_placeholder').html('<div id="alertdiv" class="alert alert-danger alert-dismissable"><span>' + message + '</span></div>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
bootstrap_alert.success = function(message) {
  $('#alert_placeholder').html('<div id="alertdiv" div class="alert alert-success alert-dismissable"><span>' + message + '</span></div>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
bootstrap_alert.info = function(message) {
  $('#alert_placeholder').html('<div id="alertdiv" div class="alert alert-info alert-dismissable"><span>' + message + '</span></div>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}