import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const schoolCard = require("../adaptiveCards/school.json");

export class SchoolCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*school\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(schoolCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}
