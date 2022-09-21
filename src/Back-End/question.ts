export interface Question {
    numberOfAnswersAllowed: number;
    type: QuestionType;
    questionId: number;
    questionText: string;
    //Key: answer text, Value: { Key: other answers Value: relationshipScore}
    answers: { [key: string]: {[key: string]: number; }; };
}

export enum QuestionType {
    MajorTalkingPoint,
    MinorTalkingPoint,
    SharedExperiences,
    SocialBarriers
}

export function getWeightOfQuestionType(type: QuestionType): number {
    switch (type) {
        case QuestionType.MajorTalkingPoint:
            return 0.2;
        case QuestionType.MinorTalkingPoint:
            return 0.1;
        case QuestionType.SharedExperiences:
            return 0.3;
        case QuestionType.SocialBarriers:
            return 0.4;
    }
}

export class Question {
    numberOfAnswersAllowed: number;
    type: QuestionType;
    questionId: number;
    questionText: string;
    //Key: answer text, Value: { Key: other answers Value: relationshipScore}
    answers: { [key: string]: {[key: string]: number; }; };

    constructor(numberOfAnswersAllowed: number, type: QuestionType, questionId: number, questionText: string) {
        this.numberOfAnswersAllowed = numberOfAnswersAllowed;
        this.type = type;
        this.questionId = questionId;
        this.questionText = questionText;
        this.answers = {};
    }
    

    public addAnswer(answer: string): void {
        this.answers[answer] = {};
    }

    public addRelationshipScore(answer: string, otherAnswer: string, relationshipScore: number): void {
        this.answers[answer][otherAnswer] = relationshipScore;
    }

    public getRelationshipScore(answer: string, otherAnswer: string): number {
        return this.answers[answer][otherAnswer];
    }
}

