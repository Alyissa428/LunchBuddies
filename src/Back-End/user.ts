import { Question } from './question';

export interface User {
    name: string;
    alias: string;
    hometown: string;
    college: string;
    location: string;
    team: string;
    language: string;
    age: number;
    questionAnswerPairs: { [key: number]: string[]; };
    userMatches: { [key: string]: number; };
}