// Station Model
var Station = function(data, index) {
  this.title = data.title;
  this.location = data.location;
  this.visible = ko.observable(true);
  this.id = index;
};

// View Model
var ViewModel = function() {
  var self = this;
  // filterString is to filter stations
  this.filterString = ko.observable("");
  // station array is to store all station models
  this.stationList = ko.observableArray([]);
  for (var i=0; i<locations.length; ++i) {
    this.stationList.push(new Station(locations[i], i));
  }
  // visibleNac is to toggle navigator
  this.visibleNav = ko.observable(true);
  // This function is to toggle Nav bar
  this.toggleNav = function() {
    this.visibleNav(!this.visibleNav());
    var bounds = new google.maps.LatLngBounds();
    this.stationList().forEach(function(data) {
      if (data.visible() === true) {
        bounds.extend(data.location);
      }
    });
    map.fitBounds(bounds);
  };
  // This function is to filter stations in the view list
  this.filterStation = ko.computed(function() {
  	if (!self.filterString()) {
  	  self.stationList().forEach(function(station) {
  		if (markers.length>0) {
  		  markers[station.id].setMap(map);
  		}
  	  });
  	  return self.stationList();
  	}
  	else {
	    // Clear infowindow and selected marker
	    curMarker = null;
	    largeInfowindow.marker = null;
	    largeInfowindow.close();
	    // Filter station array
	    return ko.utils.arrayFilter(self.stationList(), (station)=>{
	    	if (station.title.toLowerCase().indexOf(self.filterString().toLowerCase()) !== -1) {
	    		markers[station.id].setMap(map);
	    		return true;
	    	}
	    	else {
	    		markers[station.id].setMap(null);
	    		return false;	    		
	    	}
	    });
	}
  });
  // This function is to reset all stations in the view list
  this.resetStation = function() {
  	this.stationList().forEach(function(station) {
		markers[station.id].setMap(map);
	});
    this.filterString("");
  };
  // This function is to select one station
  this.selectStation = function(station) {
    var id = station.id;
    var marker = markers[id];
    populateInfoWindow(marker, largeInfowindow);
  };
};

// Activates knockout.js
ko.applyBindings(new ViewModel());