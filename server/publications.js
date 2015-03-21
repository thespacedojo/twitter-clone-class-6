Meteor.publish('myTweets', function() {
  var userCursor = Users.find({_id: this.userId});
  var user = userCursor.fetch()[0];
  var cursors = [];
  var ids = [];
  var self = this;
  ids.push(user.profile.followingIds);
  ids.push(self.userId);
  followingIds = _.flatten(ids);
  cursors.push(Tweets.find({userId: {$in: followingIds}}));
  cursors.push(Users.find({
    _id: {$in: followingIds}
  }, {
    fields: {username: 1, "profile.name": 1}
  }));

  userCursor.observeChanges({
    changed: function(id, user) {
      ids = user.profile.followingIds;
      ids.push(self.userId);
      console.log(followingIds);
      flatIds = _.flatten(ids);
      addedFollowingIds = _.difference(flatIds, followingIds);
      removedFollowingIds = _.difference(followingIds, flatIds);
      followingIds = flatIds;
      // console.log(removedFollowingIds);
      if (addedFollowingIds) {
        users = Users.find({_id: {$in: addedFollowingIds}}, {fields: {username: 1, "profile.name": 1}});
        _.each(users.fetch(), function(user) {
          console.log(user);
          self.added('users', user._id, user);
          tweets = Tweets.find({userId: user._id});
          tweets.forEach(function(tweet) {
            console.log(tweet);
            self.added('tweets', tweet._id, tweet);
          });
        });
      }
      if (removedFollowingIds) {
        users = Users.find({_id: {$in: removedFollowingIds}}, {fields: {username: 1, "profile.name": 1}});
        _.each(users.fetch(), function(user) {
          self.removed('users', user._id);
          tweets = Tweets.find({userId: user._id});
          tweets.forEach(function(tweet) {
            self.removed('tweets', tweet._id);
          });
        });
      }
    }
  });

  return cursors;
});

Meteor.publish('profile', function(username) {
  user = Meteor.users.find({username: username}, {fields: {emails: 0, services: 0}});
  return user;
});

Meteor.publish('profileTweets', function(username) {
  user = Meteor.users.findOne({username: username}, {fields: {emails: 0, services: 0}});
  return Tweets.find({userId: user._id});
});
