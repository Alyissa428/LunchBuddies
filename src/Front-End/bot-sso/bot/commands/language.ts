import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const languageCard = require("../adaptiveCards/language.json");

export class LanguageCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*language\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(languageCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}