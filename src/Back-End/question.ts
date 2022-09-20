export interface Question {
    numberOfAnswersAllowed: number;
    type: QuestionType;
    questionId: number;
    questionText: string;
    answers: { [key: string]: AnswerRelationship[]; };
}

export enum QuestionType {
    MajorTalkingPoint,
    MinorTalkingPoint,
    SharedExperiences,
    SocialBarriers
}

export interface AnswerRelationship {
    key: string;
    value: number;
}