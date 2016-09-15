/// <reference path="../typings/index.d.ts"/>

let results = $("#results");
let textBox = $("#text-box");
let title = $('#title')[0];

let resultTemplate = $('#result-template').html();
Mustache.parse(resultTemplate);

function cleanString(string: string) {
  return string.replace('@', '').replace(' ', '');
}

function maxTone(tones: Object) {
  let maxTone = Object.keys(tones).reduce((result, item) => {
    if (tones[item] > result.score){
      result.score = tones[item]
      result.tone_name = item
    } 
    return result
  }, {
    score:0,
    tone_name: ""
  })
  return maxTone
};

function sendTweetToneRequest(userName: string, callback): void {
  console.log('sending request');
  let cleanUserName = cleanString(userName);
  
  let url = `https://immense-sea-71091.herokuapp.com/tweetTone/${cleanUserName}`;
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function (data) {
      callback(data);
  })
  .fail(function (error) {
    console.log(error);
  });
};

$('form').submit((event) => {
    event.preventDefault();
    if (textBox.val().length !== 0) {
      title.innerHTML = 'loading...';
      let query = textBox.val();
      sendTweetToneRequest(query, (res) => {
        let max = maxTone(res.tone)
        console.log(max);
        

        let newResult = Mustache.render(resultTemplate, {
          userName: res.tweetInfo.userName || 'no userName',
          tone: `${max.tone_name}: ${max.score}`,
          profileImage: res.tweetInfo.profileImage || 'http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png'
        });

        results.append(newResult);
        title.innerHTML = 'Enter a name'
      })
      textBox.val('');
    }
  return false
})

