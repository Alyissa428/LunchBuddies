# LunchBuddy

<div style="text-align: center;">

![](./images/lunch_buddy_logo.png)

</div>

LunchBuddy is a chatbot app that helps you find a friend to meet for lunch! Just answer a few questions and LunchBuddy will match you with a new friend based on your common interests, location, and other preferences.

## User Guidelines:

LunchBuddy uses your Microsoft credentials to authenticate you, and to properly authenticate your information with the chatbot the first time you use the app, you will need to create an account on https://ngrok.com/ and then follow the instructions there to add your personal auth token to your account.

Once you have launched the app, simply use the suggested commands to interact with the chatbot, build your profile and start finding lunch buddies!

## Back-End Design

Our app uses MongoDB to store existing Users and their growing profile as they answer more questions. To calculate which users to recommend for Lunch Buddies, our app uses a unique AI Heuristic algorithm that applies weights to a variety of questions and answers in the database and calculates compatibility through front and back-propogation. Over time, our AI gets to know the users better and improves its accuracy.

## Developer Guidelines:

[Link to Chatbot API documentation](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots)


A sample MS Teams chatbot app is included in `reference_demos/bot-sso/`, to test this app locally to get a feel for how chatbots work:
- Install the Teams Toolkit in VS Code
- Open the `reference_demos/bot-sso/` folder in VS Code
- Press `F5` to locally build the app in debug mode; it should ask you to authenticate with your Microsoft account and open an instance of the locally running Hello World app in a browser instance of MS Teams
