success = function(position) {
  Session.set('location', position);
};

Meteor.startup(function() {
  navigator.geolocation.getCurrentPosition(success);
});
