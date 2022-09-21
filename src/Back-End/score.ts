import {User} from './user';
import {Question} from './question';
import {QuestionController} from './QuestionController';

export class Score {
    getScore(userA: User, userB: User, questionController: QuestionController): number {
        let sumScore = 0.0;
        let numCommonQuestions = 0;
        let questions = questionController.getQuestions();
        // iterate through every question.
        questions.forEach(question => {
            //Get map of all questionId/answerList pairs for users A and B
            let answersA = userA.questionAnswerPairs[question.questionId];
            let answersB = userB.questionAnswerPairs[question.questionId]; 

            if (answersA.length && answersB.length){
                numCommonQuestions++;
            }
            let numAnswerMatches = 0;
            //Loop over all questions that user A answered
            answersA.forEach(answerA => {
                //If user B also has answered this question, count number of matched answers and divide by lower total 
                //number of selections by either user (in case of "choose up to #" questions where users selected different number of answers)

                answersB.forEach(answerB => {
                    if (answerA == answerB) {
                        numAnswerMatches++;
                        console.log("users A and B both have answer `"+answerA+"` for question `"+question.questionId+"`: +1")
                    }
                    else {
                        //TODO: decide if we need this else statement
                        // let proximityAnswers = question.answers[answerA];
                        // tempScore = proximityAnswers.has(answerB) ? proximityAnswers[answerB] == null ? 0 : proximityAnswers[answerB] : 0;
                    }
                });

            });
            console.log("Compatibility based on question id `"+question.questionId+"`:",numAnswerMatches / question.numberOfAnswersAllowed,"(answers allowed: "+question.numberOfAnswersAllowed+")");
            sumScore += numAnswerMatches / question.numberOfAnswersAllowed;
        });

        console.log("[score.ts] sumScore="+sumScore+", numCommonQuestions="+numCommonQuestions)
        return sumScore / numCommonQuestions;
    }
}