Template.tweets.created = function() {
  Session.set('lastSeenTweets', new Date());
};

Template.tweets.helpers({
  tweets: function() {
    return Tweets.find({tweetedAt: {$lt: Session.get('lastSeenTweets')}}, {sort: {tweetedAt: -1}});
  },
  newTweets: function() {
    return Tweets.find({tweetedAt: {$gt: Session.get('lastSeenTweets')}}, {sort: {tweetedAt: -1}});
  }
});

Template.tweets.events({
  "click .show-new-tweets": function(event, template) {
    Session.set('lastSeenTweets', new Date());
  }
});
