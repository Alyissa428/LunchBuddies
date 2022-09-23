import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const officeLocationCard = require("../adaptiveCards/officeLocation.json");

export class OfficeLocationCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*office location\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(officeLocationCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}
