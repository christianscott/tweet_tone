/// <reference path="../typings/index.d.ts"/>

let result = $(".result")[0];
let textBox = $("#text-box");

function maxTone(tones: Object) {
  let maxTone = Object.keys(tones).reduce((result, item) => {
    if (tones[item] > result.score)
      result.score = tones[item]
      result.tone_name = item
      return result
  }, {
    score:0,
    tone_name: ""
  })
  return maxTone
};

function sendTweetToneRequest(username: string, callback): void {
  let url = `https://immense-sea-71091.herokuapp.com/tweetTone/${username}`;
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function (data) {
      console.log(data);
      callback(data);
  })
  .fail(function (error) {
    console.log(error);
  });
};

$('form').submit((event) => {
    event.preventDefault();
    if (textBox.val().length !== 0) {
      let username = textBox.val();
      sendTweetToneRequest(username, (tones) => {
        let max = maxTone(tones);
        result.innerHTML = `${username}'s max emotion, according to the last 50 tweets, is ${max.tone_name.toLowerCase()}`;
      })
      textBox.val('');
    }
  return false
})

