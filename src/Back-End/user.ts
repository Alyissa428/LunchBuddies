import { Question } from './question';

export interface User {
    name: string;
    alias: string;
    hometown: string;
    college: string;
    location: string;
    team: string;
    jobTitle: string;
    language: string;
    age: number;
    questionAnswerPairs: { [key: number]: string[]; };
    userMatches: { [key: string]: number; };
}

export class User {
    name: string;
    alias: string;
    hometown: string;
    college: string;
    location: string;
    team: string;
    jobTitle: string;
    language: string;
    age: number;
    questionAnswerPairs: { [key: number]: string[]; };
    userMatches: { [key: string]: number; };

    constructor(name: string, alias: string, location: string, jobTitle: string) {
        this.name = name;
        this.alias = alias;
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

    public addMatch(user: User, score: number): void {
        this.userMatches[user.alias] = score;
    }

    public getMatch(user: User): number {
        return this.userMatches[user.alias];
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
}