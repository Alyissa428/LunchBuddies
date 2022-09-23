import { Question } from './question';
import { QuestionController } from './QuestionController';
import { Score } from './score';

export class User {
    private name: string;
    private email: string;
    private location: string;
    private jobTitle: string;
    private questionAnswerPairs: Map<number,string[]>;
    private userMatches: { [key: string]: number; };

    //Make a default constructor with no parameters
    public static default(): User {
        let user = new User();
        user.name = "";
        user.email = "";
        user.location = "";
        user.jobTitle = "";
        user.questionAnswerPairs = new Map<number,string[]>();
        user.userMatches = {};
        return user;
    }

    constructor(name?: string, email?: string, location?: string, jobTitle?: string) {
        this.name = name;
        this.email = email;
        this.location = location;
        this.jobTitle = jobTitle;
        this.questionAnswerPairs = new Map<number,string[]>();
        this.userMatches = {};
    }

    public answerQuestion(questionId: number, answers: string[]): void {
        this.questionAnswerPairs.set(questionId, answers);
    }

    public addMatch(user: User, controller: QuestionController): void {
        let scoreModel = new Score();
        let score = scoreModel.getScore(this, user, controller);
        //if this user doesn't already have a match with the given user, add it
        if (this.userMatches[user.email] == null) {
            this.userMatches[user.email] = score;
        }
    }

    public getMatch(user: User): number {
        return this.userMatches[user.email];
    }

    public getMatches(): { [key: string]: number; } {
        return this.userMatches;
    }

    public getQuestionAnswerPairs(): Map<number,string[]> {
        return this.questionAnswerPairs;
    }

    public getQuestionAnswerPair(questionId: number): string[] {
        return this.questionAnswerPairs.get(questionId);
    }

    //Create getters and setters for all of the user's attributes
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getJobTitle(): string {
        return this.jobTitle;
    }

    public setJobTitle(jobTitle: string): void {
        this.jobTitle = jobTitle;
    }
}