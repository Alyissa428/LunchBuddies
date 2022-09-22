import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const originCard = require("../adaptiveCards/origin.json");

export class OriginCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*origin\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(originCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}