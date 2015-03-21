Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweetStream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('myTweets');
    }
  });
  this.route('notifications', {
    path: '/notifications',
    waitOn: function() {
      return Meteor.subscribe('mentions');
    },
    data: function() {
      return {
        tweets: Tweets.find({})
      };
    }
  });
  this.route('profile', {
    path: '/u/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username)
      ];
    },
    data: function() {
      return {
        user: Meteor.users.findOne({username: this.params.username}),
        tweets: Tweets.find({})
      };
    }
  });
});
