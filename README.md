# MSA module 2 submission

[http://tweet-tone.azurewebsites.net/](http://tweet-tone.azurewebsites.net/)

![screenshot](http://i.imgur.com/3ETaJNq.png)

Supply a twitter handle and the site will give you an estimate of how that user feeling, based on the last 50 tweets they sent. Not perfect, gets a bit weird if you enter names too quickly or supply a username that doesnt exist.

Makes use of a simple API I made, found [here](https://github.com/chrfrasco/tweet_tone_api). It uses the Twitter and IBM watson APIs. It is hosted on heroku and can be found [here](https://immense-sea-71091.herokuapp.com/)

Usage of the API is simple:
'tweets' returns an object containing the screen name, profile image url and last 50 tweets of a given user:
```bash
$ curl -X GET -H "Accept: application/json" "https://immense-sea-71091.herokuapp.com/tweets/lorde"
{"tweets":["@idolator @Fergie holy shit","@Henry__Oliver ...  "userName":"lorde"}
```
'tone' returns an object containing measurements for each of 5 emotions:
```bash
$ curl -X GET -H "Accept: application/json" "https://immense-sea-71091.herokuapp.com/tone/some%20text"
{"Anger":0.230832,"Disgust":0.092083,"Fear":0.136511,"Joy":0.293168,"Sadness":0.545412}
```
'tweetTone' combines the two, and measures tone for the last 50 tweets of a given user:
```bash
$ curl -X GET -H "Accept: application/json" "https://immense-sea-71091.herokuapp.com/tweetTone/lorde"
{"tone":{"Anger":0.575457  ...  "userName":"lorde"}
```
