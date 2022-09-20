export interface User {
    name: string;
    alias: string;
    location: string;
    team: string;
    age: number;
    questionAnswerPairs: Dictionary<Question, string[]>;
    userMatches: Dictionary<User, number>;
}