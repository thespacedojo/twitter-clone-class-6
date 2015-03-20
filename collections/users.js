Users = Meteor.users;

Meteor.methods({
  follow: function(followId) {
    Users.update(this.userId, {$push: {"profile.followingIds": followId}});
  },
  unfollow: function(followId) {
    Users.update(this.userId, {$pull: {"profile.followingIds": followId}});
  }
});
