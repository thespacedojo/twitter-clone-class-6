Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {})]
});

Images.allow({
  insert: function(userId, doc) {
    return userId;
  },
  download: function(userId) {
    return true;
  }
});
