//Creates new question
import { Question } from './question';
import { User } from './user';
import { QuestionType } from './question';
import { Score } from './score';

export class QuestionController {

    private questions: Question[] = [];
    private users: User[] = [];

    constructor() {
        this.questions = [];
        this.users = [];
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
        let majorQuestion = this.getRandomQuestion(QuestionType.MajorTalkingPoint);
        let minorQuestion = this.getRandomQuestion(QuestionType.MinorTalkingPoint);

        return [majorQuestion, minorQuestion];
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
    public getQuestionAnswers(questionId: number): { [key: string]: {[key: string]: number;} } | null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].getQuestionId() === questionId) {
                return this.questions[i].getAnswers();
            }
        }
        return null;
    }
}