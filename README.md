Data for Houston Data Viz Meetup February 2016 [data jam](http://houstondatavis.github.io/data-jam-february-2016/)

# About this data set

These Tweets were pulled from Twitter's Streaming API and collected approximately from October 2014 to January 2015, with little to no intermission.  Tweets containing one of following terms -- `alcoholic`, `depressed`, `depression`, `suicidal`, or `suicide` -- are available here both in `csv` (delimited by tabs) and `json`.  Additionally, a sentiment analysis has been run on the Tweets and added to the data as well.  Retweets, by way of the retweet button, have been excluded to try to increase uniqueness of Tweets.

Many attributes of the [full Twitter JSON](https://dev.twitter.com/overview/api/tweets) have been left out.

# Data set features

| Column Name      | Column Description |
| ---------------- | ------------------ |
| Date             | Timestamp          |
| Term             | One of `alcoholic`, `depressed`, `depression`, `suicidal`, `suicide` |
| Tweet            | The tweet string   |
| Lat              | Latitude of where Tweet was recorded |
| Long             | Longitude ...      |
| N_followers      | Number of followers of Tweeter |
| Neg              | Value of 0.0 or 1.0 for negative sentiment |
