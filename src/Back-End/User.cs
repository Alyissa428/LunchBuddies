using System;
using Question;
//User object that has a list of all Questions objects that the user has answered and a list of all the users that the user has matched with
public class User
{
    public string Name;
    public string Alias;
    public string Location;
    public string Team;
    public List<Question> Questions;
    public List<User> Matches;

    public User(List<Question> questions, List<User> matches)
    {
        Questions = questions;
        Matches = matches;
    }
}
