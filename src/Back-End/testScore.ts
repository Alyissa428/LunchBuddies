import { QuestionType } from './question';
import { QuestionController } from './QuestionController';
import { Score } from './score'
// import { User } from './user'

function main(){
    let score_obj = new Score();

    let qc = new QuestionController();

    let q1 = {
        numberOfAnswersAllowed: 2,
        type: QuestionType.MajorTalkingPoint,
        questionId: 12,
        questionText: "which of these numbers do you like the most?",
        //Key: answer text, Value: { Key: other answers Value: relationshipScore}
        answers: { 
            "one": {"two" : 0.0, "three" : 0.0 },
            "two": {"one" : 0.0, "three" : 0.0 },
            "three": {"one" : 0.0, "two" : 0.0 },
        }
    }
    qc.addQuestion(q1);

    let userA = {
        name: "Alfred Arnold",
        alias: "alfredarnold",
        location: "ATL-AY",
        team: "Azure",
        age: 25,
        questionAnswerPairs: { 
            12: ["one","two"],
            13: ["answer1"]
        },
        userMatches: { },
    };

    let userB = {
        name: "Bruce Barnaby",
        alias: "brucebarnaby",
        location: "ATL-AY",
        team: "Azure",
        age: 30,
        questionAnswerPairs: { 12: ["one","three"] },
        userMatches: { },
    };

    console.log("score_obj.getScore(userA, userB, qc) -> ",score_obj.getScore(userA, userB, qc));
}
main();