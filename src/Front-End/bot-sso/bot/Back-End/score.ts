import {User} from './user';
import {Question} from './question';
import {QuestionController} from './QuestionController';
import { getWeightOfQuestionType } from './question';

var debug : Boolean = true; //If this is true, debug output will be written to console when running

export class Score {
    getScore(userA: User, userB: User, questionController: QuestionController): number {
        if (debug) console.log("[score.ts] Calculating score for User A ("+userA.getName()+") and User B ("+userB.getName()+")...");

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
            if (debug) console.log("[score.ts] checking for common answers for question `"+questionId+"`... `"+question?.getQuestionText()+"` (questionType="+question.getType()+", weight="+getWeightOfQuestionType(question.getType())+")");

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
                            if (debug) console.log("[score.ts] Users A and B both have answer `"+answer1+"` for question `"+questionId+"`: +1")
                        //Only do similarity scoring if there is a valid answer relationship map for this question
                        } else if (answerRelationshipMap) {
                            if (debug) console.log("[score.ts] No answer matching `"+answer1+"` for question `"+questionId+"` for User B, checking for similar answers...")
                            //Iterate through all the answers in answersLong and find the greatest score in answerRelationshipMap to answer1
                            let maxScore = 0;
                            answersLong.forEach(answer2 => {
                                let relationships = answerRelationshipMap.get(answer1);
                                //If there is no relationship map for this answer, give it a 0 (answers have nothing to do with each other and should only get credit if they directly match)
                                if (relationships != null) {
                                    let score = relationships.get(answer2);
                                    if (score && (score > maxScore)) {
                                        maxScore = score;
                                        if (debug) console.log("[score.ts] Similar answer `"+answer2+"` for question `"+questionId+"` found for User B: +"+maxScore+" if no better option is found.")
                                    }
                                }
                            });
                            thisQuestionScore += maxScore;
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
                    if (debug) console.log("[score.ts] Question ID `"+questionId+"`: sumScore += "+thisScore+"*"+weight+", totalWeight += "+weight);
                }
            }
        });

        if (debug) console.log("[score.ts] sumScore="+sumScore+", numCommonQuestions="+numCommonQuestions)
        //Compute the weighted average of sumScore with the weights of the question types
        
        //Return the average score, or 0 if no common questions
        if (numCommonQuestions > 0) {
            let final_score = sumScore / totalWeight;
            if (debug) console.log("[score.ts] Final compatibility score for User A ("+userA.getName()+") and User B ("+userB.getName()+"): "+sumScore+" / "+totalWeight+" = "+final_score);
            return final_score; 
        } else {
            return 0.0;
        }

    }
}