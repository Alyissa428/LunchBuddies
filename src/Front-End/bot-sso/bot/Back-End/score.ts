import {User} from './user';
import {Question} from './question';
import {QuestionController} from './QuestionController';

var debug : Boolean = true; //If this is true, debug output will be written to console when running

export class Score {
    getScore(userA: User, userB: User, questionController: QuestionController): number {
        let sumScore = 0.0;
        let numCommonQuestions = 0;
        // iterate through every question of the user with fewer answered questions
        let qaPairs1 = userA.getQuestionAnswerPairs();
        let qaPairs2 = userB.getQuestionAnswerPairs();
        if (qaPairs2.size < qaPairs1.size) {
            qaPairs1 = userB.getQuestionAnswerPairs();
            qaPairs2 = userA.getQuestionAnswerPairs();
            if (debug) console.log("[score.ts] user B has fewer answered questions");
        }

        if (debug) console.log("[score.ts] qaPairs1.size="+qaPairs1.size+", qaPairs2.size="+qaPairs2.size);
            
        qaPairs1.forEach((answerList, questionId) => {
            let question = questionController.getQuestion(questionId);
            if (debug) console.log("[score.ts] checking for common answers for question `"+questionId+"`... `"+question?.getQuestionText()+"`");

            if (question != null){ // Make sure the question ID returned a valid question
                var answers2 = qaPairs2.get(questionId);
                // Only proceed if second user has also answered this question
                if (answers2 && answers2.length){
                    numCommonQuestions++; //Increment common question counter for average calculation later
                    
                    let numAnswerMatches = 0;
                    //Loop over all of user 1's answers
                    answerList.forEach(answer1 => {
                        if (debug) console.log("[score.ts] Checking for `"+answer1+"` in answerList `["+answers2+"]`");
                        //If user 2 also has answered this question, count number of matched answers and divide by lower total 
                        //number of selections by either user (in case of "choose up to #" questions where users selected different number of answers)
                        if (answers2.includes(answer1)) {
                            numAnswerMatches++;
                            if (debug) console.log("[score.ts] users A and B both have answer `"+answer1+"` for question `"+questionId+"`: +1")
                        } else {
                            //TODO: implement proximity score for 
                            // let proximityAnswers = question.answers[answerA];
                            // tempScore = proximityAnswers.has(answerB) ? proximityAnswers[answerB] == null ? 0 : proximityAnswers[answerB] : 0;
                        }
                    });
                    if (debug) console.log("[score.ts] Compatibility based on question id `"+questionId+"`:",numAnswerMatches / question.getNumberOfAnswersAllowed(),"(answers allowed: "+question.getNumberOfAnswersAllowed()+")");
                    let thisScore = numAnswerMatches / answerList.length;
                    if (answers2.length <= answerList.length) {
                        thisScore = numAnswerMatches / answers2.length;
                    }
                    sumScore += thisScore;
                }
            }
        });

        if (debug) console.log("[score.ts] sumScore="+sumScore+", numCommonQuestions="+numCommonQuestions)

        //Return the average score, or 0 if no common questions
        if (numCommonQuestions > 0) {
            //TODO: change this from uniform average to weighted average using QuestionType enum mappings
            return sumScore / numCommonQuestions; 
        } else {
            return 0.0;
        }

    }

    private ComputeAverageScore() : number {
        
        return 0.0;
    }
}