    document.getElementById("defaultOpen").click();

    function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    
    function openCity(evt, cityName) 
    {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
        {
        tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        
    for (i = 0; i < tablinks.length; i++) 
        {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    

//script for passcode/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).ready(function () {
    var i = 0;
    localStorage.setItem("i",i);
 });


function insert(value)
{   
    
    if($("#first").html() != "<h3>-</h3>" )
    {
        if($("#second").html() != "<h3>-</h3>" )
        {
            if($("#third").html() != "<h3>-</h3>" )
            {
                var dis4 = value;
                $("#fourth").html("<h3>"+dis4+"</h3>");
                localStorage.setItem("fourth", dis4);
                //msg_alert('Authenticating ...', 2);
                 
                //window.setTimeout(post, 2500);
                
            }
            else
            {
                var dis3 = value;
                $("#third").html("<h3>"+dis3+"</h3>");
                localStorage.setItem("third", dis3);
            }
        }
        else
        {
            var dis2 = value;
            $("#second").html("<h3>"+dis2+"</h3>");
            localStorage.setItem("second", dis2);
        }
    }
    else
    {
        var dis1 = value;
        $("#first").html("<h3>"+dis1+"</h3>");
        localStorage.setItem("first", dis1);
    }

    
}



function reset()
{
    $('#first').html("<h3>-</h3>");
    $('#second').html("<h3>-</h3>");
    $('#third').html("<h3>-</h3>");
    $('#fourth').html("<h3>-</h3>");
}

function del_num()
{
    
    if($("#fourth").html() != "<h3>-</h3>" )
    {
        $('#fourth').html("<h3>-</h3>");
    }
    else
    {
        if($("#third").html() != "<h3>-</h3>" )
        {
            $('#third').html("<h3>-</h3>");     
        }
        else
        {
            if($("#second").html() != "<h3>-</h3>" )
            {
                $('#second').html("<h3>-</h3>");
                
            }
            else
            {
                if($("#first").html() != "<h3>-</h3>")
                {
                    $('#first').html("<h3>-</h3>");
                }
                else
                {
                    msg_alert('Pin code already empty',3);
                }
            }
        }
    }
}

function chance ()
{
    var a = 1;
    var i = localStorage.getItem("i");
    i = (+i) + (+a);
    
    localStorage.setItem("i",i);
    if(i=="3")
    {
        return false;
    }
    
    return true;
}

function submitPin(){


            var pwd = localStorage.getItem("first");
            pwd = pwd+localStorage.getItem("second");
            pwd = pwd+localStorage.getItem("third");
            pwd = pwd+localStorage.getItem("fourth");
            localStorage.setItem("pwd", pwd);

            var user = localStorage.getItem("username");

            $.ajax({
                    type:'post',
                    url: 'http://localhost/dpapps/index.php/social_connect/getPin',
                    data:{
                    'members_pin_no':pwd,
                    'members_username':user
                },
                    error: function(error_data){
                 	console.log(error_data);
                 	},
                    success:function(data){
                   	console.log(data);
                    msg_alert('Pin code Updated',1);
                    pass_url('member/overview.html');
					}
        });

}