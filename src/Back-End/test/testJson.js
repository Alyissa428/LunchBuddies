"use strict";
exports.__esModule = true;
//Use the JsonTranslator to translate a JSON file to a Question object
var JsonTranslator_1 = require("../JsonTranslator");
var user = (0, JsonTranslator_1.JsonToUser)("../UserJson.json");
console.log(user);
