import {User} from './user';
import {Question} from './question';
import {QuestionController} from './QuestionController';

export class Score {
    getScore(userA: User, userB: User, questionController: QuestionController): number {
        let score = 0.0;
        let questions = questionController.getQuestions();
        // iterate through every question.
        questions.forEach(question => {
            let answersA = userA.questionAnswerPairs[question.questionId];
            let answersB = userB.questionAnswerPairs[question.questionId];
            answersA.forEach(answerA => {
                let tempScore = 0;
                answersB.forEach(answerB => {
                    if (answerA == answerB) {
                        tempScore = 1;
                    }
                    else {
                        let proximityAnswers = question.answers[answerA];
                        tempScore = proximityAnswers.has(answerB) ? proximityAnswers[answerB] == null ? 0 : proximityAnswers[answerB] : 0;
                    }
                });
                score += tempScore;
            });
        });
        return score;
    }
}