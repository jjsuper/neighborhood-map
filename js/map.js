
var map;
var largeInfowindow;

// 
function initMap() {
  // Constructor create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.8271784, lng: -122.2913078},
    zoom: 13
  });

  largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Create an array of markers on initialize.
  for (var i = 0; i < model.locations.length; i++) {
    // Get the position from the location array
    var position = model.locations[i].location;
    // Get the title from location array
    var title = model.locations[i].title;
    // Get the formatted_address from the location array
    //var address = locations[i].formatted_address;
    // Create a marker per location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: null,
      id: i,
    });

    model.locations[i].marker = marker;


    // Push the marker into marker array
    //model.markers.push(marker);
    // Create an onclick event to open an infowindow
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
      octopus.toggleBounce(this);
    });
    bounds.extend(marker.position);
  }
  // Ectend the boundaries of the map
  map.fitBounds(bounds);

  octopus.init();
}


// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('');

    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
      model.curMarker = null;
      marker.setAnimation(null);
    });

    var content = '<div>' + marker.title + '</div>';

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        location: marker.position
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          address = results[0].formatted_address;
          content += '<div>' + address + '</div>';

          // foursquare
          var foursquareClientId = "E4HFZNBQFR5CDD114IHH1NLU1B42C3WGPD3RVZ5P1O2B4DOQ";
          var foursquareClientSecret = "QLUW5CPHX3KI34K3KSGXYIGBNFKN44LM0LUW1KFFH2MXBEYC";

          var foursquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + foursquareClientId;
          foursquareUrl += "&client_secret=" + foursquareClientSecret + "&v=20130815&ll=";
          foursquareUrl += marker.position.lat().toString() + "," + marker.position.lng().toString();
          foursquareUrl += "&query=station";

          $.getJSON(foursquareUrl, function(data) {
            //console.log(data);
            var venue = data.response.venues[0];
            var venueId = venue.id;
            
            //var address = venue.location.formattedAddress;
            //console.log(address);

            foursquareUrl = "https://api.foursquare.com/v2/venues/" + venueId;
            foursquareUrl += "/photos?client_id=" + foursquareClientId;
            foursquareUrl += "&v=20150603&client_secret=" + foursquareClientSecret;

            $.getJSON(foursquareUrl, function(data) {
              var photo = data.response.photos.items[0];
              var prefix = photo.prefix;
              var suffix = photo.suffix;

              var imageUrl = prefix + "200x200" + suffix;

              //console.log(imageUrl);
              content += '<img src="' + imageUrl  + '">';
              //console.log(content);
              infowindow.setContent(content);

            }).error(function(e) {
              content += "<div>" + "Foursquare could not find the pictures" + "</div>";
              infowindow.setContent(content);
            });
          }).error(function(e) {
            content += "<div>" + "Foursquare could not find the location" + "</div>";
            infowindow.setContent(content);
          });
        }
        else {
          content += '<div>' + "Google could not find the location" + '</div>';
          infowindow.setContent(content);
          //window.alert('We could not find the location.');
        }
      }
    );

    infowindow.open(map, marker);
  }
}

