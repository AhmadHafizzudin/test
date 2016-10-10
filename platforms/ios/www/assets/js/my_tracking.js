
getLocation1();

function getLocation1() {
    if (navigator.geolocation) {
        var optn1 = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
//                    navigator.geolocation.getCurrentPosition(showPosition, showError);
        var watchID1 = navigator.geolocation.watchPosition(showPosition1, showError1, optn1);

    } else {
    }
}

function showPosition1(position) {
//                var latlon = position.coords.latitude + "," + position.coords.longitude;
//
//                var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
//                        + latlon + "&zoom=16&size=800x600&sensor=false";
//                document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";

    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    $.post(URL_SERVER + "driver_save_location.php", {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
        username: localStorage.getItem("username")
    }).done(function (data) {
    });
}

function showError1(error) {
//    switch (error.code) {
//        case error.PERMISSION_DENIED:
//            x.innerHTML = "User denied the request for Geolocation."
//            break;
//        case error.POSITION_UNAVAILABLE:
//            x.innerHTML = "Location information is unavailable."
//            break;
//        case error.TIMEOUT:
//            x.innerHTML = "The request to get user location timed out."
//            break;
//        case error.UNKNOWN_ERROR:
//            x.innerHTML = "An unknown error occurred."
//            break;
//    }
}