import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
const rawNewUserCard = require("../adaptiveCards/newUser.json");

export class NewUserCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*new user\s*/];
  }

  async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawNewUserCard);
    return await parameters.context.sendActivity({ attachments: [card] });
  }
}
