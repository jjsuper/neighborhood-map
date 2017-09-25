
var model = {
  locations: [
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
  ],
  curMarker: null,
  init: function() {
    for (var i = 0; i < this.locations.length; i++) {
      this.locations[i].visible = true;
    }
  }
};


var octopus = {
  getVisibleStation: function() {
    var visibleStation = model.locations.filter(function(location) {
      return location.visible;
    });
    return visibleStation;
  },
  setAllStation: function() {
    var stations = model.locations;
    for (var i=0; i<stations.length; ++i) {
      stations[i].visible = true;
      stations[i].marker.setMap(map);
    }
    model.curMarker = null;
    largeInfowindow.marker = null;
    largeInfowindow.close();
    view.render();
  },
  setStation: function(content) {
    //console.log(content);
    var stations = this.getVisibleStation();
    for (var i=0; i<stations.length; ++i) {
      var station = stations[i];
      var title = station.title.toLowerCase();
      if(title.indexOf(content.toLowerCase()) !== -1) {
        station.visible = true;
        station.marker.setMap(map);
      }
      else {
        station.visible = false;
        station.marker.setMap(null);
      }
    }
    model.curMarker = null;
    largeInfowindow.marker = null;
    largeInfowindow.close();
    view.render();
  },
  toggleNav: function() {
    var nav = document.getElementById('nav');
    var main = document.getElementById('main');
    if(nav.style.display == "none") {
      nav.style.display = "block";
      main.style.left = "300px";
    }
    else {
      nav.style.display = "none";
      main.style.left = "0";
    }
    view.render();
  },

  toggleBounce: function(marker) {
    if (model.curMarker === null) {
      model.curMarker = marker;
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    else if(model.curMarker !== marker) {
      model.curMarker.setAnimation(null);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      model.curMarker = marker;
    }
  },

 
  init: function() {
    model.init();
    view.init();
  }
};


var view = {
  init: function() {
    this.stationList = document.getElementById('station-list');
    
    var filterContent = document.getElementById('filter-content');

    document.getElementById('filter-button').addEventListener('click', function() {
      octopus.setStation(filterContent.value);
      filterContent.value = '';
    });

    document.getElementById('refresh-button').addEventListener('click', function() {
      octopus.setAllStation();
      filterContent.value = '';
    });

    document.getElementById('icon').addEventListener('click', octopus.toggleNav);

    
    this.render();
  },

  render: function() {
    var stations = octopus.getVisibleStation();
    this.stationList.innerHTML = '';
    var center = new google.maps.LatLng(37.8271784, -122.2913078);
    var bounds = new google.maps.LatLngBounds();

    for(var i=0; i<stations.length; ++i) {
      var station = stations[i];
      var elem = document.createElement('li');
      elem.textContent = station.title;
      elem.addEventListener('click', (function(stationCopy) {
        return function() {
          populateInfoWindow(stationCopy.marker, largeInfowindow);
          octopus.toggleBounce(stationCopy.marker);
        };
      })(station));

      bounds.extend(station.location);
      this.stationList.appendChild(elem);
    }

    map.panTo(center);
    map.fitBounds(bounds);
  }
};



