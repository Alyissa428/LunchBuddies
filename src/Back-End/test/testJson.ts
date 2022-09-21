//Use the JsonTranslator to translate a JSON file to a Question object
import { JsonToQuestion, JsonToUser } from '../JsonTranslator';
import { User } from '../user';

let user = JsonToUser("../UserJson.json");
console.log(user);