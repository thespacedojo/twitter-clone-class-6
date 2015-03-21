Template.tweet.helpers({
  tweetedTime: function() {
    return moment(this.tweetedAt).fromNow();
  },
  tweetText: function() {
    if (this.linkedText) {
      return Spacebars.SafeString(this.linkedText);
    } else {
      return this.text;
    }
  }
});
