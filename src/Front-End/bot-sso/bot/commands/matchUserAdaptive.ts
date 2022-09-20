import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
const rawLearnCard = require("../adaptiveCards/match.json");

export class MatchCommand extends BotCommand {
  matchObj: { firstname: string };
  constructor() {
    super();
    this.matchPatterns = [/^\s*match\s*/];
    this.matchObj = { firstname: "John" };
  }

  async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    return await parameters.context.sendActivity({ attachments: [card] });
  }
}