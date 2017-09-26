// Global Variables
var map;
var largeInfowindow;   // Create a global infowindow
var curMarker = null;  // Create a current selected Marker

// Create a new blank array for all the listing markers
var markers =  [];

// Foursquare API keys
var foursquareClientId = "E4HFZNBQFR5CDD114IHH1NLU1B42C3WGPD3RVZ5P1O2B4DOQ";
var foursquareClientSecret = "QLUW5CPHX3KI34K3KSGXYIGBNFKN44LM0LUW1KFFH2MXBEYC";

// Station List
var locations = [
  {title: '12th St. Oakland City Center', location: {lat: 37.8036197, lng: -122.271625}},
  {title: '16th St. Mission', location: {lat: 37.7650579, lng: -122.419705}},
  {title: '19th St. Oakland', location: {lat: 37.8088334, lng: -122.2683476}},
  {title: '24th St. Mission', location: {lat: 37.7522493, lng: -122.4184588}},
  {title: 'Ashby', location: {lat: 37.8528068, lng: -122.2700629}},
  {title: 'Balboa Park', location: {lat: 37.7215968, lng: -122.447511}},
  {title: 'Bay Fair', location: {lat: 37.6969298, lng: -122.1265135}},
  {title: 'Castro Valley', location: {lat: 37.6907474, lng: -122.075606}},
  {title: 'Civic Center / UN Plaza', location: {lat: 37.78007780000001, lng: -122.4141004}},
  {title: 'Coliseum', location: {lat: 37.7536685, lng: -122.1968981}},
  {title: 'Colma', location: {lat: 37.684638, lng: -122.466233}},
  {title: 'Concord', location: {lat: 37.973737, lng: -122.029095}},
  {title: 'Daly City', location: {lat: 37.7063632, lng: -122.4692604}},
  {title: 'Downtown Berkeley', location: {lat: 37.8700973, lng: -122.2681472}},
  {title: 'Dublin / Pleasanton', location: {lat: 37.7016504, lng: -121.8991813}},
  {title: 'El Cerrito del Norte', location: {lat: 37.9251091, lng: -122.3168014}},
  {title: 'El Cerrito Plaza', location: {lat: 37.9026314, lng: -122.2989345}},
  {title: 'Embarcadero', location: {lat: 37.7929053, lng: -122.397059}},
  {title: 'Fremont', location: {lat: 37.5574675, lng: -121.9766338}},
  {title: 'Fruitvale', location: {lat: 37.7723362, lng: -122.2221342}},
  {title: 'Glen Park', location: {lat: 37.7330628, lng: -122.4338194}},
  {title: 'Hayward', location: {lat: 37.6697446, lng: -122.087033}},
  {title: 'Lake Merritt', location: {lat: 37.7970303, lng: -122.2651829}},
  {title: 'Lafayette', location: {lat: 37.89318, lng : -122.1246409}},
  {title: 'MacArthur', location: {lat: 37.8290643, lng: -122.267047}},
  {title: 'Millbrae', location: {lat: 37.600271, lng: -122.3867068}},
  {title: 'Montgomery St.', location: {lat: 37.7894069, lng: -122.4010673}},
  {title: 'North Berkeley', location: {lat: 37.8739672, lng: -122.283443}},
  {title: 'North Concord / Martinez', location: {lat: 38.0031926, lng: -122.0246557}},
  {title: 'Oakland International Airport', location: {lat: 37.711599, lng: -122.2121336}},
  {title: 'Orinda', location: {lat: 37.87836, lng: -122.1837993}},
  {title: 'Pittsburg / Bay Point', location: {lat: 38.018916, lng: -121.9451274}},
  {title: 'Pleasant Hill / Contra Costa Centre', location: {lat: 37.9284679, lng: -122.0560133}},
  {title: 'Powell St.', location: {lat: 37.7844688, lng: -122.4079864}},
  {title: 'Richmond', location: {lat: 37.9368536, lng : -122.3536024}},
  {title: 'Rockridge', location: {lat: 37.8447023, lng : -122.251392}},
  {title: 'San Bruno', location: {lat: 37.6377568, lng: -122.416301}},
  {title: 'San Francisco International Airport', location: {lat: 37.6159629, lng: -122.3924154}},
  {title: 'San Leandro', location: {lat: 37.72195019999999, lng: -122.1608553}},
  {title: 'South Hayward', location: {lat: 37.6343602, lng: -122.057201}},
  {title: 'South San Francisco', location: {lat: 37.6642461, lng: -122.4439623}},
  {title: 'Union City', location: {lat: 37.590626, lng: -122.0173933}},
  {title: 'Walnut Creek', location: {lat: 37.9055372, lng: -122.0675783}},
  {title: 'Warm Springs / South Fremont', location: {lat: 37.5023538, lng: -121.9363454}},
  {title: 'West Dublin / Pleasanton', location: {lat: 37.6997562, lng: -121.9282403}},
  {title: 'West Oakland', location: {lat: 37.8048733, lng: -122.2951396}}
];

// Initialize Google Map
function initMap() {
  // Constructor create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.8271784, lng: -122.2913078},
    zoom: 13
  });

  largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Create an array of markers on initialize
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array
    var position = locations[i].location;
    // Get the title from location array
    var title = locations[i].title;
    // Create a marker per location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
    });

    // Push the marker into marker array
    markers.push(marker);
    // Create an click event to open an infowindow
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(marker.position);
  }
  // Extend the boundaries of the map
  map.fitBounds(bounds);
};

// This function add animation BOUNCE into the selected marker 
function addBounce(marker) {
  if (curMarker === null) {
    curMarker = marker;
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
  else if(curMarker !== marker) {
    curMarker.setAnimation(null);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    curMarker = marker;
  }
};

// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // Clear the infowindow content to give the streetview time to load
    infowindow.setContent('');

    // Make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
      curMarker = null;
      marker.setAnimation(null);
    });

    var content = '<div>' + marker.title + '</div>';

    // Initialize the geocoder
    var geocoder = new google.maps.Geocoder();
    // Get the address of the station
    geocoder.geocode(
      {
        location: marker.position
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // Add address into the content
          var address = results[0].formatted_address;
          content += '<div>' + address + '</div>';

          // Request foursquareUrl to get venue id
          var foursquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + foursquareClientId;
          foursquareUrl += "&client_secret=" + foursquareClientSecret + "&v=20130815&ll=";
          foursquareUrl += marker.position.lat().toString() + "," + marker.position.lng().toString();
          foursquareUrl += "&query=station";

          // Get venue id from Foursquare API
          $.getJSON(foursquareUrl, function(data) {
            var venue = data.response.venues[0];
            var venueId = venue.id;

            // Request foursquareUrl to get photo
            foursquareUrl = "https://api.foursquare.com/v2/venues/" + venueId;
            foursquareUrl += "/photos?client_id=" + foursquareClientId;
            foursquareUrl += "&v=20150603&client_secret=" + foursquareClientSecret;

            // Get photo from Foursquare API
            $.getJSON(foursquareUrl, function(data) {
              var photo = data.response.photos.items[0];
              var prefix = photo.prefix;
              var suffix = photo.suffix;
              var imageUrl = prefix + "200x200" + suffix;

              // Add photo into the content
              content += '<img src="' + imageUrl  + '">';
              infowindow.setContent(content);
            }).fail(function(e) {
              // In case no photo is found
              content += "<div>" + "Foursquare could not find the pictures" + "</div>";
              infowindow.setContent(content);
            });
          }).fail(function(e) {
            // In case no venue is found
            content += "<div>" + "Foursquare could not find the location" + "</div>";
            infowindow.setContent(content);
          });
        }
        else {
          // In case no address is found 
          content += '<div>' + "Google could not find the location" + '</div>';
          infowindow.setContent(content);
        }
      }
    );
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
    // Add animation on the correct marker.
    addBounce(marker);
  }
};

// Error callback for GMap API request
function mapError() {
  window.alert('We could not load Google Map!');
};