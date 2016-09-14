/// <reference path="../typings/index.d.ts"/>

let result = $(".result")[0];

interface tone {
  score: number;
  tone_name: string;
}

function maxTone(toneArray: tone[]): tone {
  let max = toneArray.reduce(function(prev, current) {
    return (prev.score > current.score) ? prev : current
  });
  return max
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
  result.innerHTML = 'The max emotion is: ' + tones;
})