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
    private numberOfAnswersAllowed: number;
    private type: QuestionType;
    private questionId: number;
    private questionText: string;
    //Key: answer text, Value: { Key: other answers Value: relationshipScore}
    private answers: Map<string,Map<string, number>>;

    constructor(numberOfAnswersAllowed: number, type: QuestionType, questionId: number, questionText: string) {
        this.numberOfAnswersAllowed = numberOfAnswersAllowed;
        this.type = type;
        this.questionId = questionId;
        this.questionText = questionText;
        this.answers = new Map<string,Map<string, number>>();
    }
    
    public getAnswers(): Map<string,Map<string,number>> {
        return this.answers;
    }

    public setAnswers(answers: Map<string,Map<string,number>>): void {
        this.answers = answers;
    }

    public getRelationshipScore(answer: string, otherAnswer: string): number {
        return this.answers[answer][otherAnswer];
    }

    //Getters and setters for the private variables
    public getNumberOfAnswersAllowed(): number {
        return this.numberOfAnswersAllowed;
    }

    public getType(): QuestionType {
        return this.type;
    }

    public getQuestionId(): number {
        return this.questionId;
    }

    public getQuestionText(): string {
        return this.questionText;
    }
}

