import {User} from './user';
import {Question} from './question';
import {QuestionController} from './QuestionController';
import { getWeightOfQuestionType } from './question';

var debug : Boolean = true; //If this is true, debug output will be written to console when running

export class Score {
    getScore(userA: User, userB: User, questionController: QuestionController): number {
        let sumScore = 0.0;
        let numCommonQuestions = 0;
        let totalWeight = 0.0;
        // iterate through every question of the user with fewer answered questions
        let qaPairsShort = userA.getQuestionAnswerPairs();
        let qaPairsLong = userB.getQuestionAnswerPairs();
        if (qaPairsLong.size < qaPairsShort.size) {
            qaPairsShort = userB.getQuestionAnswerPairs();
            qaPairsLong = userA.getQuestionAnswerPairs();
            if (debug) console.log("[score.ts] user B has fewer answered questions");
        }

        if (debug) console.log("[score.ts] qaPairsShort.size="+qaPairsShort.size+", qaPairsLong.size="+qaPairsLong.size);
            
        qaPairsShort.forEach((answersShort, questionId) => {
            let question = questionController.getQuestion(questionId);
            let answerRelationshipMap = question.getAnswers();
            if (debug) console.log("[score.ts] checking for common answers for question `"+questionId+"`... `"+question?.getQuestionText()+"`");

            if (question != null){ // Make sure the question ID returned a valid question
                var answersLong = qaPairsLong.get(questionId);
                // Only proceed if second user has also answered this question
                if (answersLong && answersLong.length){
                    numCommonQuestions++; //Increment common question counter for average calculation later
                    
                    let thisQuestionScore = 0;
                    //Loop over all of user 1's answers
                    answersShort.forEach(answer1 => {
                        if (debug) console.log("[score.ts] Checking for `"+answer1+"` in answersShort `["+answersLong+"]`");
                        //If user 2 also has answered this question, count number of matched answers and divide by lower total 
                        //number of selections by either user (in case of "choose up to #" questions where users selected different number of answers)
                        if (answersLong.includes(answer1)) {
                            thisQuestionScore += 1;
                            if (debug) console.log("[score.ts] users A and B both have answer `"+answer1+"` for question `"+questionId+"`: +1")
                        } else {
                            //Iterate through all the answers in answersLong and find the greatest score in answerRelationshipMap to answer1
                            let maxScore = 0;
                            answersLong.forEach(answer2 => {
                                let score = answerRelationshipMap.get(answer1).get(answer2);
                                if (score > maxScore) {
                                    maxScore = score;
                                }
                            });
                            thisQuestionScore += maxScore;
                            //TODO: implement proximity score that adds some amount < 1 for similar answers that dont match
                            // let proximityAnswers = question.answers[answerA];
                            // tempScore = proximityAnswers.has(answerB) ? proximityAnswers[answerB] == null ? 0 : proximityAnswers[answerB] : 0;
                        }
                    });
                    if (debug) console.log("[score.ts] Compatibility based on question id `"+questionId+"`:",thisQuestionScore / question.getNumberOfAnswersAllowed(),"(answers allowed: "+question.getNumberOfAnswersAllowed()+")");
                    let thisScore = thisQuestionScore / answersShort.length;
                    if (answersLong.length <= answersShort.length) {
                        thisScore = thisQuestionScore / answersLong.length;
                    }
                    let weight = getWeightOfQuestionType(question.getType());
                    sumScore += thisScore * weight;
                    totalWeight += weight;
                }
            }
        });

        if (debug) console.log("[score.ts] sumScore="+sumScore+", numCommonQuestions="+numCommonQuestions)
        //Compute the weighted average of sumScore with the weights of the question types
        

        //Return the average score, or 0 if no common questions
        if (numCommonQuestions > 0) {
            return sumScore / totalWeight; 
        } else {
            return 0.0;
        }

    }

    private ComputeAverageScore() : number {
        
        return 0.0;
    }
}