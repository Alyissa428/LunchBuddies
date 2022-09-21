import { QuestionType } from '../question';
import { QuestionController } from '../QuestionController';
import { Score } from '../score'
import { User } from '../user'

function main(){
    let score_obj = new Score();

    let qc = buildQuestionController();

    var userMap : Map<string,User> = buildUserMap();

    testFunction1(score_obj, qc, userMap);
    testFunction2(score_obj, qc, userMap);
}

function buildQuestionController() : QuestionController {
    let qc = new QuestionController();

    let q12 = {
        numberOfAnswersAllowed: 2,
        type: QuestionType.MajorTalkingPoint,
        questionId: 12,
        questionText: "Which of these numbers do you like the most?",
        //Key: answer text, Value: { Key: other answers Value: relationshipScore}
        answers: { 
            "one": {"two" : 0.0, "three" : 0.0 },
            "two": {"one" : 0.0, "three" : 0.0 },
            "three": {"one" : 0.0, "two" : 0.0 },
        }
    }
    qc.addQuestion(q12);

    let q13 = {
        numberOfAnswersAllowed: 1,
        type: QuestionType.SocialBarriers,
        questionId: 13,
        questionText: "Which of these languages are you most comfortable speaking?",
        //Key: answer text, Value: { Key: other answers Value: relationshipScore}
        answers: { 
            "English": {"Spanish" : 0.25, "Pig-Latin" : 0.0 },
            "Spanish": {"English" : 0.25, "Pig-Latin" : 0.0 },
            "Pig-Latin": {"English" : 0.0, "Spanish" : 0.0 },
        }
    }
    qc.addQuestion(q13);

    return qc;
}

function buildUserMap() : Map<string,User> {
    let um = new Map<string,User>();

    let qaPairsA = new Map<number,string[]>();
    qaPairsA.set(12, ["one","two"]);
    qaPairsA.set(13, ["English"]);
    console.log("[testScore.ts] qaPairsA.size="+qaPairsA.size);
    var userA : User = {
        name: "Alfred Arnold",
        alias: "alfredarnold",
        hometown: "Atlanta",
        college: "Georgia Tech",
        location: "ATL-AY",
        team: "Azure",
        language: "English",
        age: 25,
        questionAnswerPairs: qaPairsA,
        userMatches: { },
    };
    um.set("A",userA);

    let qaPairsB = new Map<number,string[]>();
    qaPairsB.set(12, ["one","three"]);
    console.log("[testScore.ts] qaPairsB.size="+qaPairsB.size);
    var userB : User = {
        name: "Bruce Barnaby",
        alias: "brucebarnaby",
        hometown: "Atlanta",
        college: "Georgia State",
        location: "ATL-AY",
        team: "Azure",
        language: "Pig-Latin",
        age: 30,
        questionAnswerPairs: qaPairsB,
        userMatches: { },
    };
    um.set("B",userB);
    
    let qaPairsC = new Map<number,string[]>();
    qaPairsB.set(12, ["one","three"]);
    qaPairsB.set(13, ["English"]);
    console.log("[testScore.ts] qaPairsB.size="+qaPairsB.size);
    var userB : User = {
        name: "Charlie Cox",
        alias: "charliecox",
        hometown: "Atlanta",
        college: "Georgia State",
        location: "ATL-AY",
        team: "Azure",
        language: "English",
        age: 30,
        questionAnswerPairs: qaPairsB,
        userMatches: { },
    };
    um.set("C",userB);

    return um;
}

function testFunction1(score_obj : Score, qc : QuestionController, userMap : Map<string,User>) {
    console.log("~~~~~ testFunction1 ~~~~~");
    console.log("[testScore.ts] score_obj.getScore(userA, userB, qc) ->",score_obj.getScore(userMap.get("A"), userMap.get("B"), qc),"(expected = 0.5)");
}

function testFunction2(score_obj : Score, qc : QuestionController, userMap : Map<string,User>) {
    console.log("~~~~~ testFunction2 ~~~~~");
    console.log("[testScore.ts] score_obj.getScore(userA, userC, qc) ->",score_obj.getScore(userMap.get("A"), userMap.get("C"), qc),"(expected = 0.75)");
}

main();