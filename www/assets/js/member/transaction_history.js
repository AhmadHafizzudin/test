$(document).ready(function() {
                   
            
        var user = localStorage.getItem("username");

        if (user != null || user !=""){

            $.post("http://localhost/dpapps/index.php/transaction_history/getUserSession/", {
                usersession: user
            }).done(function (data) {
                
            });

            $.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/transaction_history/viewHistory',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                 
                    $.each(data.results, function(index,item){

                        jenis = item.temp_type;
                    if (jenis == "Money") {
            unit = " MYR";
          } else {
            unit = " g";
          }     

                    $("#content").append('<tr><td>'+item.temp_receiver_name+'</td><td>'+item.temp_via+'</td><td>'+item.temp_date+'</td><td>'+item.temp_type+'</td><td>'+item.temp_total+unit+'</td><td>'+item.temp_status+'</td></tr>');

                    
                 
                });

                

                 } // End of success function of ajax form
             }); // End of second ajax call (money)

            $.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/transaction_history/viewPending',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                 
                    $.each(data.results, function(index,item){

                        jenis = item.temp_type;
                    if (jenis == "Money") {
            unit = " MYR";
          } else {
            unit = " g";
          }     

                    $("#contentP").append('<tr><td>'+item.temp_receiver_name+'</td><td>'+item.temp_via+'</td><td>'+item.temp_date+'</td><td>'+item.temp_type+'</td><td>'+item.temp_total+unit+'</td><td>'+item.temp_status+'</td></tr>');

                    
                 
                });

                

                 } // End of success function of ajax form
             }); // End of second ajax call (money)

            $.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/transaction_history/viewComplete',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                 
                    $.each(data.results, function(index,item){

                        jenis = item.temp_type;
                    if (jenis == "Money") {
            unit = " MYR";
          } else {
            unit = " g";
          }     

                    $("#contentC").append('<tr><td>'+item.temp_receiver_name+'</td><td>'+item.temp_via+'</td><td>'+item.temp_date+'</td><td>'+item.temp_type+'</td><td>'+item.temp_total+unit+'</td><td>'+item.temp_status+'</td></tr>');

                    
                 
                });

                

                 } // End of success function of ajax form
             }); // End of second ajax call (money)

       }else{
        pass_url("login.html");
       }



   
    });

