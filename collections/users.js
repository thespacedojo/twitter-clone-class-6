Users = Meteor.users;

UserSchema = new SimpleSchema({
  username: {
    type: String,
    label: "Username",
    max: 200
  },
  "profile.description": {
    type: String,
    label: "Description"
  },
  "profile.image": {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    },
    label: 'Choose file',
    optional: true
  }
});

Users.helpers({
  profileImage: function() {
    return "/cfs/files/images/" + this.profile.image;
  }
});

Users.attachSchema(UserSchema);

Meteor.methods({
  follow: function(followId) {
    Users.update(this.userId, {$push: {"profile.followingIds": followId}});
  },
  unfollow: function(followId) {
    Users.update(this.userId, {$pull: {"profile.followingIds": followId}});
  }
});

Users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    return userId === doc._id;
  }
});
