/// <reference path="../typings/index.d.ts"/>

let result = $(".result")[0];

interface tone {
  score: number;
  tone_name: string;
}

function maxTone(tones: Object): tone {
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

sendTweetToneRequest('lorde', (tones) => {
  let max = maxTone(tones);
  result.innerHTML = 'The max emotion is: ' + max.tone_name + ' at ' + max.score;
})