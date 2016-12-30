$(document).ready(function () {

        /* if my var reload isn't set locally.. in the first time it will be true */
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
        
        $("#type").change(function () {
            var value = $("#type option:selected").val();
            var theDiv = $(".is" + value);

            theDiv.slideDown().removeClass("hidden");
            theDiv.siblings('[class*=is]').slideUp(function () {
                $(this).addClass("hidden");
                $("#loaders").addClass("loaders");
            });
        });

        var container = document.getElementById("main");
var mc = new Hammer(container);

mc.on("swiperight", function() {
        backpage();
    }); 
mc.on("swipeleft", function() {
        
        validateForm();
    }); 

    });

function backpage(){
    pass_url('member/select_receiver.html');
}  

    $(document).on('click', '.details', function (event) {//highlight selected item

        if (!$(event.target).is('input')) {
            var obj =$(this).find('input');      
            obj.prop('checked', !obj.is(':checked'));
            $(this).closest("tbody").toggleClass("selected", this.checked); 
         
        }

        var itemtype = document.getElementById("type").value;
        var arr = [];


        if(itemtype == "Gold"){

            var goldlist = [];
            var newlist = [];
            var cbcheck = $('input.cbgold:checkbox:checked');

            $.ajax({ //display list of gold
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllGold/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                 $.each(data.results, function(index,item){

                    goldlist.push(item.gacc_id);
                 
                });                                   
                

            cbcheck.each(function () {

            if(this.checked){
                arr.push($(this).val());//push value from checkbox
            
                 
            } //if checkbox checked
            });//end of get all checked checkbox

            for (var i = 0; i < goldlist.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (goldlist[i] == arr[j]) {
                            newlist.push(arr[j]);
                        }
                    }
                }

            // store array data to the session storage
            sessionStorage.setItem("selgold",  JSON.stringify(newlist));
              
            
            } // End of success function of ajax form
             }); // End of second ajax call (gold)

            


        }else if(itemtype == "Silver"){

            var silverlist = [];
            var newlist = [];
            var cbcheck = $('input.cbsilver:checkbox:checked');
            $.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllSilver/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){
                 $.each(data.results, function(index,item){

                    silverlist.push(item.sacc_id);
                 
                });                                   
                

            cbcheck.each(function () {

            if(this.checked){
                arr.push($(this).val());//push value from checkbox
            
                 
            } //if checkbox checked
            });//end of get all checked checkbox

            for (var i = 0; i < silverlist.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (silverlist[i] == arr[j]) {
                            newlist.push(arr[j]);
                        }
                    }
                }

            // store array data to the session storage
            sessionStorage.setItem("selsilver",  JSON.stringify(newlist));
            
            } // End of success function of ajax form
             }); // End of second ajax call (silver)
        }

    });
   

//end of view list based on selected -->

//validate page -->

 

function validateForm() {
    
var itemtype = document.getElementById("type").value;
var curBal = document.getElementById("moneybalance").value;
var transAmount = document.getElementById("amount").value;

if(itemtype == "" || itemtype == null){
        msg_alert('Please select your assets type', 6);
        return false;
        itemtype.focus();

}else if(itemtype == "Money"){

    if(transAmount >= curBal -1){
        msg_alert('Insufficient Balance', 6);
        return false;
    
    }else if(transAmount == "" || transAmount == null || transAmount == 0){
        msg_alert('Amount is empty', 6);
        return false;

    }else if(transAmount< 0){
        msg_alert('Amount is invalid', 6);
        return false;

    }else if (transAmount<= curBal -1){

        var newItem = new Array();
        var newMoney = new Array();

        newItem[0] = $("#type").val(); 
        newMoney[0] = transAmount; 

        // store array data to the session storage
        sessionStorage.setItem("newItem",  JSON.stringify(newItem));
        sessionStorage.setItem("transvalue",  transAmount);

        //Use JSON to retrieve the stored data and convert it 
        /*var storedData = sessionStorage.getItem("newItem");
        if (storedData) {
            newItem = JSON.parse(storedData);
        }*/

        pass_url('member/writemessage_transfer.html');
        
    }else{
        msg_alert('Amount is invalid', 6);
        return false;
    }

}else if(itemtype == "Gold"){

    var totalChecked = $('input[name=gold]:checked').length;

    if(totalChecked <= 0){
        msg_alert('Please select at least 1', 6);
        return false;
    }else{

    var newItem = new Array();

    newItem[0] = $("#type").val();

    // store array data to the session storage
    sessionStorage.setItem("newItem",  JSON.stringify(newItem));

    //Use JSON to retrieve the stored data and convert it 
    /*var storedData = sessionStorage.getItem("newItem");
    if (storedData) {
        newItem = JSON.parse(storedData);
    }*/

    pass_url('member/writemessage_transfer.html');

    }

}else if(itemtype == "Silver"){

    var totalChecked = $('input[name=silver]:checked').length;

    if(totalChecked <= 0){
        msg_alert('Please select at least 1', 6);
        return false;
    }else{

    var newItem = new Array();

    newItem[0] = $("#type").val();

    // store array data to the session storage
    sessionStorage.setItem("newItem",  JSON.stringify(newItem));

    //Use JSON to retrieve the stored data and convert it 
    /*var storedData = sessionStorage.getItem("newItem");
    if (storedData) {
        newItem = JSON.parse(storedData);
    }*/


    pass_url('member/writemessage_transfer.html');
    }

}
    
}


//end of validate -->

//get receiver data from previous page -->


if(sessionStorage.length > 0) {
    for (i=0; i<=sessionStorage.length-1; i++)  
    {   
        key = sessionStorage.key(i);  
        val = sessionStorage.getItem("newReceiver");   
    }
var newVal = val.replace(/[\]\[\"\']+/g,'');


var name = newVal.split(",")[0];
var social = newVal.split(",")[1];
var pic = newVal.split(",")[2];

document.getElementById("receiver").value =  name;
document.getElementById("userpic").src =  pic;
document.getElementById("usersocial").src =  social;
}


//end of get receiver data from previous page -->

//get account item list -->

   $(document).ready(function() {
                   
   
        var user = localStorage.getItem("username");

        if (user != null || user !=""){

            $.post("http://localhost/dpapps/index.php/overview/getUserSession/", {
                usersession: user
            }).done(function (data) {
                //alert(data);
            });

   
            $.ajax({ //check money money balance
                 url: 'http://localhost/dpapps/index.php/sendpayment/checkMoneyBalance/',
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

            $.ajax({ //display list of gold
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllGold/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){

                    var count = 0;

                $.each(data.results, function(index,item){
                $("#fgold").append('<tbody class="details"><tr><td rowspan="4"><input type="checkbox" id="gold['+count+']" value="' + item.gacc_id + '" class="cbgold" name="gold"/>&nbsp;<img class="imgbg" id="goldpic['+count+']" src="http://localhost/dpapps/images/' + item.gacc_image + '" width="70px"></td><td id="goldno['+count+']">&nbsp;<b>Certificate No:&nbsp;</b>' + item.gacc_cert_no + '</td></tr><tr><td id="goldname['+count+']">&nbsp;<b>Item:</b>&nbsp;' + item.gacc_gold_name + '</td></tr><tr><td id="goldweight['+count+']">&nbsp;<b>Weight:</b>&nbsp;' + item.gacc_weight + '&nbsp;gram</td></tr><tr><td id="goldpurity['+count+']">&nbsp;<b>Purity:</b>&nbsp;' + item.gacc_purity + '<input type="hidden" id="goldid['+count+']" value="' + item.gacc_id + '"/></td></tr></tbody>');

                count ++;

                });                
                 } // End of success function of ajax form

             }); // End of second ajax call (gold)
            $('#loaders').hide();

            $.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/sendpayment/listAllSilver/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 console.log(error_data);
                 },
                 success: function(data){

                    var count = 0;
                 
                    $.each(data.results, function(index,item){
                $("#fsilver").append('<tbody class="details"><label><tr><td rowspan="4"><input type="checkbox" id="silver['+count+']" value="' + item.sacc_id + '" class="cbsilver" name="silver"/>&nbsp;<img  class="imgbg" id="silverpic['+count+']" src="http://localhost/dpapps/images/' + item.sacc_image + '" width="70px"></td><td id="silverno['+count+']">&nbsp;<b>Certificate No:&nbsp;</b>' + item.sacc_cert_no + '</td></tr><tr><td id="silvername['+count+']">&nbsp;<b>Item:</b>&nbsp;' + item.sacc_silver_name + '</td></tr><tr><td id="silverweight['+count+']">&nbsp;<b>Weight:</b>&nbsp;' + item.sacc_weight + '&nbsp;gram</td></tr><tr><td id="silverpurity['+count+']">&nbsp;<b>Purity:</b>&nbsp;' + item.sacc_purity + '<input type="hidden" id="silverid['+count+']" value="' + item.sacc_id + '"/></td></tr></label></tbody>');

                count ++;

                });
                 } // End of success function of ajax form
             }); // End of second ajax call (silver)
            $('#loaders').hide();
        

       }else{
        pass_url("login.html");
       }
});


//end of get account item list -->
