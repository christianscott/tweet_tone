/// <reference path="../typings/index.d.ts"/>

let result = $(".result")[0];

function sendTweetToneRequest(username: string): void {
  let url = `https://immense-sea-71091.herokuapp.com/tweetTone/${username}`;
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function (data) {
      console.log(data);
  })
  .fail(function (error) {
    console.log(error);
  });
};

sendTweetToneRequest('lorde')