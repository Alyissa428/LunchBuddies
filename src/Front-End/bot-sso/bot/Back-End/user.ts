import { Question } from './question';
import { QuestionController } from './QuestionController';
import { Score } from './score';

export class User {
    private name: string;
    private email: string;
    private hometown: string;
    private college: string;
    private location: string;
    private team: string;
    private jobTitle: string;
    private language: string;
    private age: number;
    private questionAnswerPairs: { [key: number]: string[]; };
    private userMatches: { [key: string]: number; };

    //Make a default constructor with no parameters
    public static default(): User {
        let user = new User();
        user.name = "";
        user.email = "";
        user.hometown = "";
        user.college = "";
        user.location = "";
        user.team = "";
        user.jobTitle = "";
        user.language = "";
        user.age = 0;
        user.questionAnswerPairs = {};
        user.userMatches = {};
        return user;
    }

    constructor(name?: string, email?: string, location?: string, jobTitle?: string) {
        this.name = name;
        this.email = email;
        this.hometown = "";
        this.college = "";
        this.location = location;
        this.jobTitle = jobTitle;
        this.team ="";
        this.language = "";
        this.age = 0;
        this.questionAnswerPairs = {};
        this.userMatches = {};
    }

    public addQuestionAnswerPair(questionId: number, answer: string): void {
        if (this.questionAnswerPairs[questionId] == null) {
            this.questionAnswerPairs[questionId] = [];
        }
        this.questionAnswerPairs[questionId].push(answer);
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

    public getQuestionAnswerPairs(): { [key: number]: string[]; } {
        return this.questionAnswerPairs;
    }

    public getQuestionAnswerPair(questionId: number): string[] {
        return this.questionAnswerPairs[questionId];
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

    public getHometown(): string {
        return this.hometown;
    }

    public setHometown(hometown: string): void {
        this.hometown = hometown;
    }

    public getCollege(): string {
        return this.college;
    }

    public setCollege(college: string): void {
        this.college = college;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getTeam(): string {
        return this.team;
    }

    public setTeam(team: string): void {
        this.team = team;
    }

    public getJobTitle(): string {
        return this.jobTitle;
    }

    public setJobTitle(jobTitle: string): void {
        this.jobTitle = jobTitle;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }
}