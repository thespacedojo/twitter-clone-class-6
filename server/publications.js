Meteor.publish('myTweets', function() {
  return Tweets.find();
});
