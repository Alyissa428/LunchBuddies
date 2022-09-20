using System;
using System.Collections.Generic;

public class CompatibilityScore
{
    public double GetCompatibilityScore(User user1, User user2)
    {
        //Iterate over every question in user1 that mathches a question in user2
        //Add the score of the question to the total score
        //Return the total score
        double totalScore = 0;
        foreach (Dictionary<Question, List<string>> questionAnswerPair in user1.QuestionAnswerPairs)
        {
            if (user2.QuestionAnswerPairs.ContainsKey(questionAnswerPair.Key))
            {
                totalScore += GetQuestionScore(questionAnswerPair.Key, questionAnswerPair.Value, user2.QuestionAnswerPairs[questionAnswerPair.Key]);
            }
        }
        return totalScore;
    }

    private double GetQuestionScore(Question question, List<string> user1Answers, List<string> user2Answers)
    {
        //Iterate over every answer in user1Answers that matches an answer in user2Answers
        //Add the score of the answer to the total score
        //Return the total score
        double totalScore = 0;
        foreach (string answer in user1Answers)
        {
            //For each answer that user 1 chose, if user 2 chose the same answer, add 1 to the total score
            if (user2Answers.Contains(answer))
            {
                totalScore += 1;
            } else {
                //Here, we will need some sort of matrix, because we need to 
                //compare each user1 answer with all answerrelationship of user 2
                foreach (string user2Answer in user2Answers) {
                    var relationshipScore = question.Answers[answer].Find(x => x.key == user2Answer);
                    if (relationshipScore != null) {
                        totalScore += relationshipScore.value;
                    }
                }
            }
        }
        return totalScore;
    }
}