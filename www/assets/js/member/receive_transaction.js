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
              localStorage.setItem('screenx1', item.temp_receiver_id);
              
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



function redirects(){
  //window.location = "login.html";
  pass_url('login.html');
  window.location.href = "index.html";
  
}