$(document).ready(function() {


  var url = window.location.href;
  id = url.substring(url.lastIndexOf('?') + 1); // get id inside url*/
  $.post("http://localhost/dpapps/index.php/receive_transaction/getUrlId/", {
    urlid: id
  }).done(function(data1) {

    var pecah = url.split("?");
    //alert(pecah[1]);
    if (typeof pecah[1] != "undefined") { 

    $.ajax({ //check money money balance
      url: 'http://localhost/dpapps/index.php/receive_transaction/viewTransDetail/',
      type: 'POST',
      dataType: 'json',
      error: function(error_data) {
        console.log(error_data);
      },
      success: function(data) {

        //pass_url('receive_transaction.html');

          if (data.results.length === 0) {

            localStorage.setItem('receiverx1', "");

            

          }else{

            var jenis = "";

            $.each(data.results, function(index, item) {


              localStorage.setItem('receiverx1', item.temp_sender);
              localStorage.setItem('typex1', item.temp_type);
              localStorage.setItem('totalweightx1', item.temp_total);
              localStorage.setItem('todayx1', item.temp_date);
              localStorage.setItem('messagex1', item.temp_message);
              localStorage.setItem('viax1', item.temp_via);
              localStorage.setItem('tempidx1', item.temp_id);
              localStorage.setItem('itemidx1', item.temp_itemid);
              localStorage.setItem('screenx1', item.temp_receiver_username);
              
              //location.href= 'index.html';
              var jenis = item.temp_type;
              sender = item.temp_sender;
              localStorage.setItem('jenisx1', jenis);
            });
          }

          pass_url('receive_transaction.html');
        } // End of success function of ajax form
    }); // End of second ajax call (money)

   }

  });

  
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
            $.each(data.results, function(index, item) {
              username = item.members_username;
            });
            var tempid = $("#tempid").val();
            var itemid = $("#itemid").val();
            var type = $("#type").text();
            var pitih = $("#totalweight").text();
            var status = "Complete";
            $.post("http://localhost/dpapps/index.php/receive_transaction/updateTrans/", {
              temp_id: tempid,
              temp_status: status
            }).done(function(data) {
              if (type == "Silver") {
                $.post("http://localhost/dpapps/index.php/receive_transaction/changeOwnerSilver/", { //silver
                  sacc_username: username,
                  temp_itemid: itemid
                }).done(function(data) {
                  bootstrap_alert.success("Transaction success.Please check your silver account");
                  $('#myModal').modal('hide');
                  $("#btnaccept").html('Check Account Now');
                  $("#btnaccept").removeAttr('data-toggle');
                  $("#btnaccept").removeAttr('data-target');
                  $('#btnaccept').attr('onClick', 'redirects();');
                });
              } else if (type == "Gold") {
                $.post("http://localhost/dpapps/index.php/receive_transaction/changeOwnerGold/", { //gold
                  gacc_username: username,
                  temp_itemid: itemid
                }).done(function(data) {
                  bootstrap_alert.success("Transaction success.Please check your gold account");
                  $('#myModal').modal('hide');
                  $("#btnaccept").html('Check Account Now');
                  $("#btnaccept").removeAttr('data-toggle');
                  $("#btnaccept").removeAttr('data-target');
                  $('#btnaccept').attr('onClick', 'redirects();');
                });
              } else if (type == "Money") {
                $.post("http://localhost/dpapps/index.php/receive_transaction/transferMoney/", { //money
                  macc_username: username,
                  macc_amount: pitih,
                  macc_sender: sender
                }).done(function(data) {
                  bootstrap_alert.success("Transaction success.Please check your money account");
                  $('#myModal').modal('hide');                  
                  $("#btnaccept").html('Check Account Now');
                  $("#btnaccept").removeAttr('data-toggle');
                  $("#btnaccept").removeAttr('data-target');
                  $('#btnaccept').attr('onClick', 'redirects();');
                });
              }
            });
          }
        } // End of success function of ajax form
    }); // End of second ajax call (money)
  });
  //bootstrap_alert.info('Authenticating ...');
});
bootstrap_alert = function() {}
bootstrap_alert.danger = function(message) {
  $('#alert_placeholder').html('<center><div id="alertdiv" class="alert alert-danger alert-dismissable"><span>' + message + '</span></div></center>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
bootstrap_alert.danger1 = function(message) {
  $('#alert_placeholder1').html('<center><div id="alertdiv" class="alert alert-danger alert-dismissable"><span>' + message + '</span></div></center>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
bootstrap_alert.success = function(message) {
  $('#alert_placeholder').html('<center><div id="alertdiv" div class="alert alert-success alert-dismissable"><span>' + message + '</span></div></center>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}
bootstrap_alert.info = function(message) {
  $('#alert_placeholder').html('<center><div id="alertdiv" div class="alert alert-info alert-dismissable"><span>' + message + '</span></div></center>')
  setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
    $("#alertdiv").remove();
  }, 2000);
}

function redirects(){
  //window.location = "login.html";
  window.location.href = 'index.html';
}