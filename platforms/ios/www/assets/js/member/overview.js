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
   
        var user = localStorage.getItem("username");

        if (user != null || user !=""){

            $.post("http://localhost/dpapps/index.php/overview/getUserSession/", {
                usersession: user
            }).done(function (data) {
                //alert(data);
            });

   
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

       }else{
        pass_url("login.html");
       }
   
    });
