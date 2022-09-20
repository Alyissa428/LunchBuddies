export interface Question {
    numberOfAnswersAllowed: number;
    type: QuestionType;
    questionId: number;
    questionText: string;
    //Key: answer text, Value: { Key: other answers: Value: relationshipScore}
    answers: { [key: string]: {[key: string]: number; }; };
}

export enum QuestionType {
    MajorTalkingPoint,
    MinorTalkingPoint,
    SharedExperiences,
    SocialBarriers
}