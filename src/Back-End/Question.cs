using System;
using System.Collections.Generic;

//Object that contains the type of question as an enum, the question itself, and the answer
public class Question
{
    public enum QuestionType { MajorTalkingPoint, MinorTalkingPoint, SharedExperiences, SocialBarriers };
    public int numberOfAnswersAllowed;
    public QuestionType Type;
    public int QuestionId;
    public string QuestionText;
    public Dictionary<string, List<AnswerRelationship>> Answers;

    public Question(QuestionType type, string questionText, Dictionary<string, List<AnswerRelationship>> answer, int numberOfAnswersAllowed = 1)
    {
        Type = type;
        QuestionText = questionText;
        Answer = answer;
        MultipleAnswers = multipleAnswers;
        //TODO: Add QuestionId

    }

    private class AnswerRelationship {
        public string key;
        public int value;

        public AnswerRelationship(string key, int value) {
            this.key = key;
            this.value = value;
        }
    }
}
