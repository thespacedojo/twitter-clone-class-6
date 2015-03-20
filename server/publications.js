Meteor.publish('myTweets', function() {
  userCursor = Users.find({_id: this.userId});
  user = userCursor.fetch()[0];
  followingIds = [];
  followingIds.push(user.profile.followingIds);
  followingIds.push(user._id);
  followingIds = _(followingIds).flatten();
  users = Users.find({_id: {$in: followingIds}}, {fields: {emails: 0, services: 0}});
  tweets = Tweets.find({userId: {$in: followingIds}});
  return [users, tweets];
});

Meteor.publish('profile', function(username) {
  user = Meteor.users.find({username: username}, {fields: {emails: 0, services: 0}});
  return user;
});

Meteor.publish('profileTweets', function(username) {
  user = Meteor.users.findOne({username: username}, {fields: {emails: 0, services: 0}});
  return Tweets.find({userId: user._id});
});
