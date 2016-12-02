//twitter profile
$.ajax({ //display list of silver
                 url: 'http://localhost/dpapps/index.php/welcome/success/',
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
                 url: 'http://localhost/dpapps/index.php/welcome/redirect',
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
                 url: 'http://localhost/dpapps/index.php/welcome/logout',
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