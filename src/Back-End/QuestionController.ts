//Creates new question
import { Question } from './question';
import { User } from './user';
import { QuestionType } from './question';

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

    //Returns the list of users
    public getUsers(): User[] {
        return this.users;
    }

    //Returns the user with the given alias
    public getUser(alias: string): User|null {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].alias === alias) {
                return this.users[i];
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestion(questionId: number): Question|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionId === questionId) {
                return this.questions[i];
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionText(questionId: number): string|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionId === questionId) {
                return this.questions[i].questionText;
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionType(questionId: number): QuestionType|null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionId === questionId) {
                return this.questions[i].type;
            }
        }
        return null;
    }

    //Returns the question with the given questionId
    public getQuestionAnswers(questionId: number): { [key: string]: {[key: string]: number;} } | null {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionId === questionId) {
                return this.questions[i].answers;
            }
        }
        return null;
    }
}