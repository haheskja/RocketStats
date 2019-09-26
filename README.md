## RocketStats

An app for finding how well your day of Rocket League actually went. For now it only focuses on boost and speed (is anything else important? 😉), but would be even more useful if it included wins and losses, goals, assists and so on.

This app is made using the [Ballchasing API](https://ballchasing.com/doc/api). What is seen here is the public part of the API, which can be accessed by anyone. For this app I have used beta features which is currently in private beta testing phase, so there is no public documentation online. [Here](https://ballchasing.com/doc/_api) if you have access. Base tech is create-react-app and Redux.

This API exposes the data gathered from the immense number of replays uploaded to Ballchasing.com. As stated previously, this API is still under testing, so it far from covers all use cases. Because of this it has been necessary to implement some workarounds. And also do a few more API calls that I ideally would have liked.

### Usage

So, this app accepts two inputs from the user, a Steam64 ID and a date. By using these two it will fetch the replays from Ballchasing using *playlist='ranked-standard' and *season='12'*. These are two arguments that could have been inputs, but I did not have enough time. From there it will populate a list with all matches from the entered date and find your average stats for the day. There is an ID and date already entered in the input fields as this tool is mainly meant to analyze your own stats and therefore you know what dates to check yourself. If you change these values you might not find anything as they both need to be correct. For testing and evaluation, please use the prefilled values or change the date to *'16/09'*, *'19/09'* or *'23/09'* as these are dates when the prefilled SteamID has played *'ranked-standard'* games in season *'12'*.

There are many optimization and error handling possibilities that have not been implemented, but it serves as a Proof of Concept. Please refresh the page and try again if something does not work. It should work, but things have been a bit inconsistent.

To start the app simply run `yarn` to install dependencies and then `yarn start` to start the development server.


