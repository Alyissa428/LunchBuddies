using System;
using Question;

public class User
{
    public string Name;
    public string Alias;
    public string Location;
    public string Team;

    public int Age;
    public Dictionary<Question, List<string>> QuestionAnswerPairs;
    public Dictionary<User, int> UserMatches;

    public User(string name, string alias, string location, string team, int age)
    {
        Name = name;
        Alias = alias;
        Location = location;
        Team = team;
        Age = age;
        QuestionAnswerPairs = new Dictionary<Question, List<string>>();
        UserMatches = new Dictionary<User, int>();
    }

    public void AddQuestionAnswerPair(Question question, List<string> answers)
    {
        QuestionAnswerPairs.Add(question, answers);
    }

    public void AddUserMatch(User user, int matchValue)
    {
        UserMatches.Add(user, matchValue);
    }
}
