﻿import { Question } from "./question";
import { User } from "./user";
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';

function QuestionToJson(question: Question) {
    const fs = require('fs');
    fs.writeFile("QuestionJson.json" , JSON.stringify(question)), function (err) {
        if (err) throw err;
    }
}

function UserToJson(user: User) {
    const fs = require('fs');
    fs.writeFile("UserJson.json", JSON.stringify(user)), function (err) {
        if (err) throw err;
    }
}

function JsonToQuestion(fileName: string = "QuestionJson.json"): Question {
    const fs = require('fs');
    let fileContent = fs.readFileSync(fileName, 'utf8');
    const questions: Question = JSON.parse(fileContent);
    return questions;
}

function JsonToUser(fileName: string = "UserJson.json"): User {
    const fs = require('fs');
    let fileContent = fs.readFileSync(fileName, 'utf8');
    const users: User = JSON.parse(fileContent);
    return users;
}