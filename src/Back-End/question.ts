export interface Question {
    numberOfAnswersAllowed: number;
    type: QuestionType;
    questionId: number;
    questionText: string;
    answers: { [key: string]: {[key: string]: number; }; };
}

export enum QuestionType {
    MajorTalkingPoint,
    MinorTalkingPoint,
    SharedExperiences,
    SocialBarriers
}