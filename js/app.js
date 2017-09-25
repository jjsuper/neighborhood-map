// Station Model
var Station = function(data, index) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
  this.visible = ko.observable(true);
  this.id = ko.observable(index);
};

// View Model
var ViewModel = function() {
  var self = this;
  // filterString is used to filter stations
  this.filterString = ko.observable("");
  // station array to store all station models
  this.stationList = ko.observableArray([]);
  for (var i=0; i<locations.length; ++i) {
    this.stationList.push(new Station(locations[i], i));
  }
  // This function is to toggle Nav bar
  this.toggleNav = function() {
    var nav = document.getElementById('nav');
    var main = document.getElementById('main');
    if(nav.style.display == "none") {
      nav.style.display = "block";
      main.style.left = nav.style.width;
    }
    else {
      nav.style.display = "none";
      main.style.left = "0";
    }
    var bounds = new google.maps.LatLngBounds();
    this.stationList().forEach(function(data) {
      if (data.visible() === true) {
        bounds.extend(data.location());
      }
    });
    map.fitBounds(bounds);
  };
  // This function is to filter stations in the view list
  this.filterStation = function() {
    var bounds = new google.maps.LatLngBounds();
    this.stationList().forEach(function(data) {
      if (data.visible() === true) {
        var substring = self.filterString().toLowerCase();
        if (data.title().toLowerCase().indexOf(substring) !== -1) {
          bounds.extend(data.location());
          markers[data.id()].setMap(map);
        }
        else {
          data.visible(false);
          markers[data.id()].setMap(null);
        }
      }
    });
    // Clear infowindow and selected marker
    curMarker = null;
    largeInfowindow.marker = null;
    largeInfowindow.close();
    map.fitBounds(bounds);
    this.filterString("");
  };
  // This function is to reset all stations in the view list
  this.resetStation = function() {
    var bounds = new google.maps.LatLngBounds();
    this.stationList().forEach(function(data) {
      data.visible(true);
      bounds.extend(data.location());
      markers[data.id()].setMap(map);
    });
    // Clear infowindow and selected marker
    curMarker = null;
    largeInfowindow.marker = null;
    largeInfowindow.close();
    map.fitBounds(bounds);
    this.filterString("");
  };
  // This function is to select one station
  this.selectStation = function(station) {
    var id = station.id();
    var marker = markers[id];
    populateInfoWindow(marker, largeInfowindow);
  };
};

// Activates knockout.js
ko.applyBindings(new ViewModel());