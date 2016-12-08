$(document).ready(function() {
            getUsers();
        });
//twitter profile
$.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/test/success/',
                 type:'POST',
                 dataType: 'json',
                 error: function(error_data){
                 //console.log(error_data);
                 document.getElementById("buttonlogin").value = "Login"; 
                 },
                 success: function(data){ 

            $("#temp").show();
            //console.log(data.name); 
            //console.log(data.id_str); 
            //console.log(data.profile_image_url);
            document.getElementById('id').innerHTML = data.id_str;
            document.getElementById('name').innerHTML = data.name;
            document.getElementById("profile_image_url").src = data.profile_image_url; 

            document.getElementById("buttonlogin").value = "Logout";
            $("#buttonlogin").attr("onclick","logout()");
                
            
            } // End of success function of ajax form

            

             }); // End of second ajax call (silver)

//end profile

function login(){


//twitter connect
$.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/test/redirect',
                 type:'POST',
                error: function(error_data){
                 //console.log(error_data);
                 alert("error");
                 },
                 success: function(data){ 

                             
                alert("Redirect to Twitter login Page");
                //console.log(data);
                //$('#result').append(data);
                $("#temp").hide();
                var html = $("#result").html(data);

            
            } // End of success function of ajax form

            

             }); // End of second ajax call (silver)


}

function logout(){


//twitter connect
$.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/test/logout',
                 type:'POST',
                error: function(error_data){
                 //console.log(error_data);
                 alert("error");
                 },
                 success: function(data){ 

                             
                alert("Logging Out");
                window.location.reload();
                //$('#result').append(data);


            
            } // End of success function of ajax form

            

             }); // End of second ajax call (silver)

//end twitter
}

function getUsers(){
        var limit=25;
            $.ajax({
                url: 'https://api.twitter.com/1.1/followers/list.json?screen_name=sangwira91&count=100',
            data: {screen_name: 'sangwira91', cursor:-1},
                dataType: 'jsonp',
                success: function(data) { 
                    if (data.length > 0 ){
                        try {
                            
                            for(i=0; i<limit; i++){ //*********************************
                              $.ajax({
                                
                                url: 'https://api.twitter.com/1.1/followers/list.json?screen_name=sangwira91&count=100',
                                data: {user_id: data.ids[i],include_entities:1},
                                dataType: 'jsonp',
                                success: function(userData) { //*********
                                    if (userData.length > 0 ){ 
                                        try {
                                            //alert(userData[0].screen_name);
                                            $('#followersList').append('<iframe allowtransparency="true" frameborder="0" scrolling="no" '+'src="//platform.twitter.com/widgets/follow_button.html?screen_name=' +userData[0].screen_name + '"' + 'style="width:300px; height:20px;" class="followerButton"></iframe></br>');
                                        } 
                                        catch (e) {
                                            alert(e);
                                        }
                                    }
    
                                } // End success 2 ***********************
                              }); // End Ajax 2
                            } // End for loop ******************************************
                            
                        } ///end try {
                         catch (e) {
                            alert(e);
                        }   
                    } //if (userData.length > 0 ){
                 } // End success 1-----------------------------------------------------
                  
        }); // End Ajax 1

    } // End of the getUsers function