Meteor.publish('myTweets', function() {
  return Tweets.find();
});

Meteor.publish('profile', function(username) {
  user = Meteor.users.find({username: username}, {fields: {emails: 0, services: 0}});
  return user;
})
