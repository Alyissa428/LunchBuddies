import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const ageCard = require("../adaptiveCards/age.json");

export class AgeCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*age\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(ageCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}