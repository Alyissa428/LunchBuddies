import { Question, QuestionType } from '../question';
import { makeDummyQuestionController, QuestionController } from '../QuestionController';
import { Score } from '../score'
import { User } from '../user'

function main(){
    let score_obj = new Score();

    let qc = buildQuestionController();

    var userMap : Map<string,User> = buildUserMap();

    let debug_mode = true;

    testSimple1(score_obj, qc, userMap, debug_mode);
    testSimple2(score_obj, qc, userMap, debug_mode);
    testEliChrisScore(score_obj, qc, userMap, debug_mode);
    testEliAlyissaScore(score_obj, qc, userMap, debug_mode);
    testEliShlokScore(score_obj, qc, userMap, debug_mode);
    testChrisAlyissaScore(score_obj, qc, userMap, debug_mode);
    testChrisShlokScore(score_obj, qc, userMap, debug_mode);
    testAlyissaShlokScore(score_obj, qc, userMap, debug_mode);
}

function buildQuestionController() : QuestionController {
    // let qc = new QuestionController();
    let qc = makeDummyQuestionController();

    //This question allows up to 2 answers, and has no answers stored in it at all (free response)
    let q120 = new Question(2, QuestionType.MajorTalkingPoint, 120, "Which of these numbers do you like the most?");
    qc.addQuestion(q120);

    let q130 = new Question(1, QuestionType.SocialBarriers, 130, "Which of these languages are you most comfortable speaking?");
    let q130_answers = new Map<string,Map<string,number>>([
        ["English",   new Map<string,number>([["Spanish",0.25], ["Pig-Latin",0.00]])],
        ["Spanish",   new Map<string,number>([["English",0.25], ["Pig-Latin",0.00]])],
        ["Pig-Latin", new Map<string,number>([["English",0.00], [  "Spanish",0.00]])],
    ]);
    q130.setAnswers(q130_answers);
    qc.addQuestion(q130);

    //This question allows 1 answer selection per user, and has an answer list with null relationship mappings
    let q140 = new Question(1, QuestionType.SharedExperiences, 140, "What is your favortie hobby?");
    let q140_answers = new Map<string,Map<string,number>>([
        ["hiking",   null],
        ["reading",   null],
        ["basketball", null],
    ]);
    q140.setAnswers(q140_answers);
    qc.addQuestion(q140);

    return qc;
}

function buildUserMap() : Map<string,User> {
    let um = new Map<string,User>();

    // let qaPairsA = new Map<number,string[]>();
    // qaPairsA.set(12, ["one","two"]);
    // qaPairsA.set(13, ["English"]);
    // console.log("[testScore.ts] qaPairsA.size="+qaPairsA.size);
    // var userA : User = {
    //     name: "Alfred Arnold",
    //     alias: "alfredarnold",
    //     hometown: "Atlanta",
    //     college: "Georgia Tech",
    //     location: "ATL-AY",
    //     team: "Azure",
    //     language: "English",
    //     age: 25,
    //     questionAnswerPairs: qaPairsA,
    //     userMatches: { },
    // };
    let userA = new User("Alfred Arnold", "alfredarnold@microsoft.com","ATL-AY","Software Engineer");
    userA.answerQuestion(120, ["one","two"]);
    userA.answerQuestion(130, ["English"]);
    um.set("A",userA);

    // let qaPairsB = new Map<number,string[]>();
    // qaPairsB.set(12, ["one","three"]);
    // console.log("[testScore.ts] qaPairsB.size="+qaPairsB.size);
    // var userB : User = {
    //     name: "Bruce Barnaby",
    //     // alias: "brucebarnaby",
    //     email: "brucebarnaby@microsoft.com",
    //     hometown: "Atlanta",
    //     college: "Georgia State",
    //     location: "ATL-AY",
    //     team: "Azure",
    //     language: "Pig-Latin",
    //     age: 30,
    //     questionAnswerPairs: qaPairsB,
    //     userMatches: { },
    // };
    let userB = new User("Bruce Barnaby", "brucebarnaby@microsoft.com","ATL-AY","Project Lead");
    userB.answerQuestion(120, ["one","three"]);
    um.set("B",userB);
    
    // let qaPairsC = new Map<number,string[]>();
    // qaPairsC.set(12, ["one","three"]);
    // qaPairsC.set(13, ["English"]);
    // console.log("[testScore.ts] qaPairsB.size="+qaPairsC.size);
    // var userC : User = {
    //     name: "Charlie Cox",
    //     alias: "charliecox",
    //     hometown: "Atlanta",
    //     college: "Georgia State",
    //     location: "ATL-AY",
    //     team: "Azure",
    //     language: "English",
    //     age: 30,
    //     questionAnswerPairs: qaPairsC,
    //     userMatches: { },
    // };
    let userC = new User("Charlie Cox", "charliecox@microsoft.com","ATL-AY","Intern");
    userC.answerQuestion(120, ["one","three"]);
    userC.answerQuestion(130, ["English"]);
    um.set("C",userC);

    let userD = new User("Desmond Deed", "desmonddeed@microsoft.com","REDMOND","Software Engineer");
    userD.answerQuestion(140, ["basketball"]);

    return um;
}

//One common question, 
function testSimple1(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testSimple1 ~~~~~");
    console.log("[testScore.ts] score_obj.getScore(userA, userB, qc) ->",score_obj.getScore(userMap.get("A"), userMap.get("B"), qc, debug_mode),"(expected = 0.5)");
}

function testSimple2(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testSimple2 ~~~~~");
    console.log("[testScore.ts] score_obj.getScore(userA, userC, qc) ->",score_obj.getScore(userMap.get("A"), userMap.get("C"), qc, debug_mode),"(expected = 0.8333)");
}

function testEliChrisScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testEliChrisScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(eli, chris, qc) ->",score_obj.getScore(qc.getUser("elinewman@microsoft.com"), qc.getUser("chrisjenkins@microsoft.com"), qc, debug_mode));
}

function testEliAlyissaScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testEliAlyissaScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(eli, alyissa, qc) ->",score_obj.getScore(qc.getUser("elinewman@microsoft.com"), qc.getUser("alsanders@microsoft.com"), qc, debug_mode));
}

function testEliShlokScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testEliShlokScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(eli, schlok, qc) ->",score_obj.getScore(qc.getUser("elinewman@microsoft.com"), qc.getUser("shlokshah@microsoft.com"), qc, debug_mode));
}

function testChrisAlyissaScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testChrisAlyissaScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(chris, alyissa, qc) ->",score_obj.getScore(qc.getUser("chrisjenkins@microsoft.com"), qc.getUser("alsanders@microsoft.com"), qc, debug_mode));
}

function testChrisShlokScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testChrisShlokScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(chris, schlok, qc) ->",score_obj.getScore(qc.getUser("chrisjenkins@microsoft.com"), qc.getUser("shlokshah@microsoft.com"), qc, debug_mode));
}

function testAlyissaShlokScore(score_obj : Score, qc : QuestionController, userMap : Map<string,User>, debug_mode : Boolean) {
    console.log("\n~~~~~ testAlyissaShlokScore ~~~~~");

    console.log("[testScore.ts] score_obj.getScore(alyissa, schlok, qc) ->",score_obj.getScore(qc.getUser("alsanders@microsoft.com"), qc.getUser("shlokshah@microsoft.com"), qc, debug_mode));
}

main();