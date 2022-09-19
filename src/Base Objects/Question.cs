using System;
using System.Collections.Generic;

//Object that contains the type of question as an enum, the question itself, and the answer
public class Question
{
    public enum QuestionType { Personality, Hobby, Food, Music, Movie, TV, Sports, Other };
    public QuestionType Type;
    public string QuestionText;
    public Dictionary<string, object> Answer;

    public Question(QuestionType type, string questionText, Dictionary<string, List<int>> answer)
    {
        Type = type;
        QuestionText = questionText;
        Answer = answer;
    }
}
