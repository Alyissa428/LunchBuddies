//Use the JsonTranslator to translate a JSON file to a Question object
import { JsonToQuestion } from '../JsonTranslator';

export function TestJson() {
    let question = JsonToQuestion("QuestionJson.json");
    console.log(question);
}