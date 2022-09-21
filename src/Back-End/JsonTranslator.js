"use strict";
exports.__esModule = true;
exports.JsonToUser = exports.JsonToQuestion = exports.UserToJson = exports.QuestionToJson = void 0;
function QuestionToJson(question) {
    var fs = require('fs');
    fs.writeFile("QuestionJson.json", JSON.stringify(question)), function (err) {
        if (err)
            throw err;
    };
}
exports.QuestionToJson = QuestionToJson;
function UserToJson(user) {
    var fs = require('fs');
    fs.writeFile("UserJson.json", JSON.stringify(user)), function (err) {
        if (err)
            throw err;
    };
}
exports.UserToJson = UserToJson;
function JsonToQuestion(fileName) {
    if (fileName === void 0) { fileName = "QuestionJson.json"; }
    var fs = require('fs');
    var fileContent = fs.readFileSync(fileName, 'utf8');
    var questions = JSON.parse(fileContent);
    return questions;
}
exports.JsonToQuestion = JsonToQuestion;
function JsonToUser(fileName) {
    if (fileName === void 0) { fileName = "UserJson.json"; }
    var fs = require('fs');
    var fileContent = fs.readFileSync(fileName, 'utf8');
    var users = JSON.parse(fileContent);
    return users;
}
exports.JsonToUser = JsonToUser;
