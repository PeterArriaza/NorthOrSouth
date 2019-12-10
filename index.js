"use strict";

$(document).ready(function() {
  $(watchSubmit);
});

// get city and state values from user search for api call; clear form
function watchSubmit() {
  $("#search").submit(function(event) {
    event.preventDefault();
    var city = $("#city").val();
    $("#city").val("");
    isItNorthOrSouthofToronto(city);
  });
}

// make api call with user's values
function isItNorthOrSouthofToronto(city) {
  var apikey = "f1639bdf2b3e4376b35046ef5c3a7a08";
  let TorontoLat = 43.6532;

  $.ajax({
    url: "https://api.opencagedata.com/geocode/v1/json",
    method: "GET",
    data: {
      key: apikey,
      q: city,
      no_annotations: 1
    },
    dataType: "json",
    statusCode: {
      200: function(response) {
        // success
        // console.log(response.results[0].formatted);
        let lat = response.results[0].geometry.lat;
        let answer = lat < TorontoLat ? "South" : "North";
        $("#result").html(`<h2>${city} is ${answer} of Toronto</h2>`);
      },
      400: function(error) {
        console.log(error);
      },
      402: function() {
        console.log("error");
      }
    }
  });
}
