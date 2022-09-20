import { Question } from './question';

export interface User {
    name: string;
    alias: string;
    location: string;
    team: string;
    age: number;
    questionAnswerPairs: { [key: number]: string[]; };
    userMatches: { [key: string]: number; };
}