Template.tweetStream.helpers({
  tweets: function() {
    return Tweets.find();
  },
  tweetedTime: function() {
    return moment(this.tweetedAt).fromNow();
  }
});

Template.tweetStream.events({
  "submit #tweetForm": function(event, template) {
    event.preventDefault();
    tweetText = template.$('#tweetForm .tweet-text').val();
    Tweets.insert({text: tweetText}, function(err, res) {
      if (res) {
        CoffeeAlerts.success("Your tweet has been added.");
        template.$('.tweet-text').val(null);
      } else {
        CoffeeAlerts.warning("There was a problem adding your tweet.");
        console.log(err);
      }
    });
  }
});
