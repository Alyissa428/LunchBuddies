//Creates new question
import { Question } from './question';
import { User } from './user';
import { QuestionType } from './question';
import { Score } from './score';

export class QuestionController {

    private static instance: QuestionController;
    private questions: Question[] = [];
    private users: User[] = [];
    private dailyQuestions: Question[] = [];

    constructor() {
        if(QuestionController.instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        QuestionController.instance = this;
        this.questions = [];
        this.users = [];
    }

    public static getInstance(): QuestionController {
        return QuestionController.instance;
    }

    //Adds a new question to the list of questions
    public addQuestion(question: Question): void {
        this.questions.push(question);
    }

    //Returns the list of questions
    public getQuestions(): Question[] {
        return this.questions;
    }

    //Adds a new user to the list of users
    public addUser(user: User): void {
        this.users.push(user);
    }

    public addNewMatch(user1: User, user2: User): void {
        user1.addMatch(user2, this);
        user2.addMatch(user1, this);
    }

    //Returns the list of users
    public getUsers(): User[] {
        return this.users;
    }

    //Returns the user with the given email
    public getUser(email: string): User|null {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].getEmail() === email) {
                return this.users[i];
            }
        }
        return null;
    }

    public getDailyQuestionList(): Question[]|null {
        //We could give one major, one minor, and one of either type?
        //Get a random major question and a random minor question from the list of questions
        let now = new Date().toLocaleTimeString('en-US');
        if (now.substring(0, 2) === "12" && now.substring(6, 8) === "PM") {
            let majorQuestion = this.getRandomQuestion(QuestionType.MajorTalkingPoint);
            let minorQuestion = this.getRandomQuestion(QuestionType.MinorTalkingPoint);
            if (this.dailyQuestions.length !== 0) {
                this.dailyQuestions = [];
            }
            this.dailyQuestions.push(majorQuestion);
            this.dailyQuestions.push(minorQuestion);
        }

        return this.dailyQuestions;
    }

    private getRandomQuestion(type: QuestionType) {
        //Choose a random question of the given type from the list of questions
        let randomQuestion: Question|null = null;
        while (randomQuestion === null) {
            let randomIndex = Math.floor(Math.random() * this.questions.length);
            if (this.questions[randomIndex].getType() === type) {
                randomQuestion = this.questions[randomIndex];
            }
        }
        return randomQuestion;
    }

    public getAllMatchingBuddies(user1: User, user2: User): User[] {
        let matchingBuddies: User[] = [];
        //Iterate over the userMatches in user1 and see if the userMatches in user2 have the same alias
        for (let user1Match in user1.getMatches()) {
            for (let user2Match in user2.getMatches()) {
                if (user1Match === user2Match) {
                    matchingBuddies.push(this.getUser(user1Match)!);
                }
            }
        }
        return matchingBuddies;
    }

    public getRecommendedUsers(user: User): User[] | null {
        let recommendedUsers: {[key: string]: number} = {};
        let scoreModel = new Score();
        //Iterate over all users and calculate their score with the given user. Return the top 3 users.
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].getEmail() !== user.getEmail()) {
                //If the user is in a different location, don't recommend them
                if (this.users[i].getLocation() !== user.getLocation()) {
                    continue;
                }
                let score = scoreModel.getScore(user, this.users[i], this);
                //If the recommendedUsers array is less than 3, just add the user
                if (recommendedUsers.length < 3) {
                    recommendedUsers[this.users[i].getEmail()] = score;
                } else {
                    //Otherwise, we need to find the user with the lowest score and replace them
                    let lowestScore = 0;
                    let lowestScoreUser = "";
                    for (let recommendedUser in recommendedUsers) {
                        if (recommendedUsers[recommendedUser] < lowestScore) {
                            lowestScore = recommendedUsers[recommendedUser];
                            lowestScoreUser = recommendedUser;
                        }
                    }
                    if (score > lowestScore) {
                        recommendedUsers[lowestScoreUser] = score;
                    }
                }
            }
        }
        let recommendedUsersArray: User[] = [];
        for (let recommendedUser in recommendedUsers) {
            recommendedUsersArray.push(this.getUser(recommendedUser)!);
        }
        return recommendedUsersArray;
    }

    //Returns the question with the given questionId
    public getQuestion(questionId: number): Question|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getQuestionId() === questionId) {
                return this.questions[i];
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionText(questionId: number): string|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getQuestionId() === questionId) {
                return this.questions[i].getQuestionText();
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionType(questionId: number): QuestionType|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getQuestionId() === questionId) {
                return this.questions[i].getType();
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionAnswers(questionId: number): Map<string,Map<string, number>> | null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getQuestionId() === questionId) {
                return this.questions[i].getAnswers();
            }
        }
        return null;
    }
}

export function makeDummyQuestionController(): QuestionController {
    let questionController = new QuestionController();
    let question1 = new Question(1, QuestionType.MinorTalkingPoint, 1, "How old are you?");
    question1.setAnswers(new Map<string, Map<string, number>>([
        ["<21", new Map<string, number>([
            ["21-30", 0.9],
            ["31-40", 0.8],
            ["41-50", 0.7],
            ["51+", 0.6],
        ])],
        ["21-30", new Map<string, number>([
            ["<21", 0.9],
            ["31-40", 0.9],
            ["41-50", 0.8],
            ["51+", 0.7],
        ])],
        ["31-40", new Map<string, number>([
            ["<21", 0.8],
            ["21-30", 0.9],
            ["41-50", 0.9],
            ["51+", 0.8],
        ])],
        ["41-50", new Map<string, number>([
            ["<21", 0.7],
            ["21-30", 0.8],
            ["31-40", 0.9],
            ["51+", 0.9],
        ])],
        ["51+", new Map<string, number>([
            ["<21", 0.6],
            ["21-30", 0.7],
            ["31-40", 0.8],
            ["41-50", 0.9],
        ])],
    ]));
    let question2 = new Question(5, QuestionType.SocialBarriers, 2, 
        "What days do you typically come into the office?");
    question2.setAnswers(new Map<string, Map<string, number>>([
        ["Monday", null],
        ["Tuesday", null],
        ["Wednesday", null],
        ["Thursday", null],
        ["Friday", null],
    ]));
    let question3 = new Question(2, QuestionType.MinorTalkingPoint, 3, 
        "What is your favorite kind of food? Choose up to two.");
    question3.setAnswers(new Map<string, Map<string, number>>([
        ["Mexican", null],
        ["Italian", null],
        ["Chinese", null],
        ["American", null],
        ["Japanese", null],
        ["Indian", null],
        ["Thai", null],
        ["Greek", null],
        ["French", null],
        ["Vietnamese", null],
        ["Korean", null],
    ]));
    let question4 = new Question(1, QuestionType.MajorTalkingPoint, 4, "What is your favorite hobby?");
    question4.setAnswers(new Map<string, Map<string, number>>([
        ["TV/Streaming", new Map<string, number>([
            ["Video Games", 0.8],
            ["Outdoor Activities", 0],
            ["Reading", 0.4],
            ["Sports", 0],
            ["Music", 0.5],
            ["Arts", 0.3],
        ])],
        ["Video Games", new Map<string, number>([
            ["TV/Streaming", 0.8],
            ["Outdoor Activities", 0],
            ["Reading", 0.2],
            ["Sports", 0],
            ["Music", 0.3],
            ["Arts", 0.1],
        ])],
        ["Outdoor Activities", new Map<string, number>([
            ["TV/Streaming", 0],
            ["Video Games", 0],
            ["Reading", 0],
            ["Sports", 0.9],
            ["Music", 0.3],
            ["Arts", 0],
        ])],
        ["Reading", new Map<string, number>([
            ["TV/Streaming", 0.4],
            ["Video Games", 0.2],
            ["Outdoor Activities", 0],
            ["Sports", 0.2],
            ["Music", 0.3],
            ["Arts", 0.1],
        ])],
        ["Sports", new Map<string, number>([
            ["TV/Streaming", 0],
            ["Video Games", 0],
            ["Outdoor Activities", 0.9],
            ["Reading", 0.2],
            ["Music", 0.3],
            ["Arts", 0],
        ])],
        ["Music", new Map<string, number>([
            ["TV/Streaming", 0.5],
            ["Video Games", 0.3],
            ["Outdoor Activities", 0.3],
            ["Reading", 0.3],
            ["Sports", 0.3],
            ["Arts", 0.1],
        ])],
        ["Arts", new Map<string, number>([
            ["TV/Streaming", 0.3],
            ["Video Games", 0.1],
            ["Outdoor Activities", 0],
            ["Reading", 0.1],
            ["Sports", 0],
            ["Music", 0.1],
        ])],
    ]));
    let question5 = new Question(1, QuestionType.MinorTalkingPoint, 5, "What is your favorite pet?");
    question5.setAnswers(new Map<string, Map<string, number>>([
        ["Dog", null],
        ["Cat", null],
        ["Bird", null],
        ["Fish", null],
        ["Reptile", null],
        ["Rodent", null],
        ["Other", null],
    ]));
    let question6 = new Question(1, QuestionType.MajorTalkingPoint, 6, 
        "What kind of music do you listen to?");
    question6.setAnswers(new Map<string, Map<string, number>>([
        ["Rock", new Map<string, number>([
            ["Pop", 0.8],
            ["Country", 0],
            ["Rap", 0.5],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0.2],
            ["Indie", 0.5],
            ["Other", 0.1],
        ])],
        ["Pop", new Map<string, number>([
            ["Rock", 0.6],
            ["Country", 0],
            ["Rap", 0.8],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0.4],
            ["Indie", 0.3],
            ["Other", 0.1],
        ])],
        ["Country", new Map<string, number>([
            ["Rock", 0],
            ["Pop", 0],
            ["Rap", 0],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0],
            ["Indie", 0],
            ["Other", 0.1],
        ])],
        ["Rap", new Map<string, number>([
            ["Rock", 0.5],
            ["Pop", 0.8],
            ["Country", 0],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0.4],
            ["Indie", 0.3],
            ["Other", 0.1],
        ])],
        ["Classical", new Map<string, number>([
            ["Rock", 0.1],
            ["Pop", 0.1],
            ["Country", 0.1],
            ["Rap", 0.1],
            ["Jazz", 0.8],
            ["Electronic", 0.1],
            ["Indie", 0.1],
            ["Other", 0.1],
        ])],
        ["Jazz", new Map<string, number>([
            ["Rock", 0.1],
            ["Pop", 0.1],
            ["Country", 0.1],
            ["Rap", 0.1],
            ["Classical", 0.8],
            ["Electronic", 0.1],
            ["Indie", 0.1],
            ["Other", 0.1],
        ])],
        ["Electronic", new Map<string, number>([
            ["Rock", 0.2],
            ["Pop", 0.4],
            ["Country", 0],
            ["Rap", 0.4],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Indie", 0.3],
            ["Other", 0.1],
        ])],
        ["Indie", new Map<string, number>([
            ["Rock", 0.5],
            ["Pop", 0.3],
            ["Country", 0],
            ["Rap", 0.3],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0.3],
            ["Other", 0.1],
        ])],
        ["Other", new Map<string, number>([
            ["Rock", 0.1],
            ["Pop", 0.1],
            ["Country", 0.1],
            ["Rap", 0.1],
            ["Classical", 0.1],
            ["Jazz", 0.1],
            ["Electronic", 0.1],
            ["Indie", 0.1],
        ])],
    ]));
    let question7 = new Question(1, QuestionType.MinorTalkingPoint, 7, "What is your favorite season?");
    question7.setAnswers(new Map<string, Map<string, number>>([
        ["Spring", null],
        ["Summer", null],
        ["Fall", null],
        ["Winter", null],
    ]));
    let question8 = new Question(1, QuestionType.MinorTalkingPoint, 8, "What is your favorite drink?");
    question8.setAnswers(new Map<string, Map<string, number>>([
        ["Coffee", new Map<string, number>([
            ["Tea", 0.5],
            ["Water", 0.1],
            ["Soda", 0.3],
            ["Juice", 0.1],
        ])],
        ["Tea", new Map<string, number>([
            ["Coffee", 0.5],
            ["Water", 0.1],
            ["Soda", 0.3],
            ["Juice", 0.1],
        ])],
        ["Water", new Map<string, number>([
            ["Coffee", 0.1],
            ["Tea", 0.1],
            ["Soda", 0.1],
            ["Juice", 0.1],
        ])],
        ["Soda", new Map<string, number>([
            ["Coffee", 0.3],
            ["Tea", 0.3],
            ["Water", 0.1],
            ["Juice", 0.1],
        ])],
        ["Juice", new Map<string, number>([
            ["Coffee", 0.1],
            ["Tea", 0.1],
            ["Water", 0.1],
            ["Soda", 0.1],
        ])],
    ]));
    let question9 = new Question(1, QuestionType.MinorTalkingPoint, 9, 
        "Do you prefer the mountains or the beach?");
    question9.setAnswers(new Map<string, Map<string, number>>([
        ["Mountains", null],
        ["Beach", null],
    ]));
    let question10 = new Question(1, QuestionType.MinorTalkingPoint, 10, 
        "Are you an introvert, extravert, or ambivert?");
    question10.setAnswers(new Map<string, Map<string, number>>([
        ["Introvert", null],
        ["Extravert", null],
        ["Ambivert", null],
    ]));
    let question11 = new Question(1, QuestionType.MajorTalkingPoint, 11,
        "What is your favorite genre of movie?");
    question11.setAnswers(new Map<string, Map<string, number>>([
        ["Action", new Map<string, number>([
            ["Comedy", 0.5],
            ["Drama", 0.1],
            ["Horror", 0.5],
            ["Romance", 0.1],
            ["Sci-Fi", 0.5],
            ["Thriller", 0.5],
            ["Other", 0.1],
        ])],
        ["Comedy", new Map<string, number>([
            ["Action", 0.5],
            ["Drama", 0.1],
            ["Horror", 0.1],
            ["Romance", 0.5],
            ["Sci-Fi", 0.1],
            ["Thriller", 0.1],
            ["Other", 0.1],
        ])],
        ["Drama", new Map<string, number>([
            ["Action", 0.1],
            ["Comedy", 0.1],
            ["Horror", 0.1],
            ["Romance", 0.5],
            ["Sci-Fi", 0.1],
            ["Thriller", 0.1],
            ["Other", 0.1],
        ])],
        ["Horror", new Map<string, number>([
            ["Action", 0.5],
            ["Comedy", 0.1],
            ["Drama", 0.1],
            ["Romance", 0.1],
            ["Sci-Fi", 0.5],
            ["Thriller", 0.5],
            ["Other", 0.1],
        ])],
        ["Romance", new Map<string, number>([
            ["Action", 0.1],
            ["Comedy", 0.5],
            ["Drama", 0.5],
            ["Horror", 0.1],
            ["Sci-Fi", 0.1],
            ["Thriller", 0.1],
            ["Other", 0.1],
        ])],
        ["Sci-Fi", new Map<string, number>([
            ["Action", 0.5],
            ["Comedy", 0.1],
            ["Drama", 0.1],
            ["Horror", 0.5],
            ["Romance", 0.1],
            ["Thriller", 0.5],
            ["Other", 0.1],
        ])],
        ["Thriller", new Map<string, number>([
            ["Action", 0.5],
            ["Comedy", 0.1],
            ["Drama", 0.1],
            ["Horror", 0.5],
            ["Romance", 0.1],
            ["Sci-Fi", 0.5],
            ["Other", 0.1],
        ])],
        ["Other", new Map<string, number>([
            ["Action", 0.1],
            ["Comedy", 0.1],
            ["Drama", 0.1],
            ["Horror", 0.1],
            ["Romance", 0.1],
            ["Sci-Fi", 0.1],
            ["Thriller", 0.1],
        ])],
    ]));
    let question12 = new Question(1, QuestionType.MinorTalkingPoint, 12,
        "Would you rather explore the ocean or outer space?");
    question12.setAnswers(new Map<string, Map<string, number>>([
        ["Ocean", null],
        ["Outer Space", null],
    ]));
    let question13 = new Question(1, QuestionType.MinorTalkingPoint, 13,
        "Do you prefer to stay in or go out?");
    question13.setAnswers(new Map<string, Map<string, number>>([
        ["Stay In", null],
        ["Go Out", null],
    ]));
    let question14 = new Question(1, QuestionType.MinorTalkingPoint, 14,
        "Are you a morning person or a night owl?");
    question14.setAnswers(new Map<string, Map<string, number>>([
        ["Morning Person", null],
        ["Night Owl", null],
    ]));
    let question15 = new Question(1, QuestionType.MinorTalkingPoint, 15,
        "What keeps you up at night?");
    question15.setAnswers(new Map<string, Map<string, number>>([
        ["That unresolved bug from work", null],
        ["Thinking about stack overflow...", null],
        ["TV", null],
        ["TikTok", null],
    ]));
    let hometownQuestion = new Question(1, QuestionType.SharedExperiences, 16,
        "Where are you from?");
    let teamQuestion = new Question(1, QuestionType.SharedExperiences, 17,
        "What team are you on?");
    let collegeQuestion = new Question(1, QuestionType.SharedExperiences, 18,
        "What college did you go to?");
    questionController.addQuestion(hometownQuestion);
    questionController.addQuestion(teamQuestion);
    questionController.addQuestion(collegeQuestion);
    questionController.addQuestion(question1);
    questionController.addQuestion(question2);
    questionController.addQuestion(question3);
    questionController.addQuestion(question4);
    questionController.addQuestion(question5);
    questionController.addQuestion(question6);
    questionController.addQuestion(question7);
    questionController.addQuestion(question8);
    questionController.addQuestion(question9);
    questionController.addQuestion(question10);
    questionController.addQuestion(question11);
    questionController.addQuestion(question12);
    questionController.addQuestion(question13);
    questionController.addQuestion(question14);
    questionController.addQuestion(question15);
    let user1 = new User("Eli Newman", "elinewman@microsoft.com", "Atlanta", "Software Engineer");
    user1.answerQuestion(1, ["22"]);
    user1.answerQuestion(18, ["NC State"]);
    user1.answerQuestion(16, ["Charlotte"]);
    user1.answerQuestion(17, ["Azure Networking"]);
    questionController.addUser(user1);
    let user2 = new User("Chris Jenkins", "chrisjenkins@microsoft.com", "Atlanta", "Software Engineer");
    user2.answerQuestion(1, ["30"]);
    user2.answerQuestion(18, ["Georgia Tech"]);
    user2.answerQuestion(16, ["Atlanta"]);
    user2.answerQuestion(17, ["Azure Networking"]);
    questionController.addUser(user2);
    let user3 = new User("Alyissa Sanders", "alsanders@microsoft.com", "Atlanta", "Software Engineer");
    user3.answerQuestion(1, ["22"]);
    user3.answerQuestion(18, ["University of North Texas"]);
    user3.answerQuestion(16, ["St. Paul"]);
    user3.answerQuestion(17, ["Azure Networking"]);
    questionController.addUser(user3);
    let user4 = new User("Shlok Shah", "shlokshah@microsoft.com", "Atlanta", "Software Engineer");
    user1.answerQuestion(1, ["25"]);
    user1.answerQuestion(18, ["Rennselaer Polytechnic Institute"]);
    user1.answerQuestion(16, ["Indore"]);
    user1.answerQuestion(17, ["Azure Container Storage"]);
    questionController.addUser(user4);
    let dailyQuestions = questionController.getDailyQuestionList();
    //For each user in questionController.users, add the daily questions to their question list
    for (let user of questionController.getUsers()) {
        let answerChoice = 0;
        for (let question of dailyQuestions) {
            let answers = question.getAnswers().keys();
            user.answerQuestion(question.getQuestionId(), answers[answerChoice]);
            answerChoice++;
        }

    }
    return questionController;
}