import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";

const weekdayQuestionCard = require("../adaptiveCards/weekday.json");

export class WeekdayCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*days in office\s*/];
  }
 
  async run(parameters: any) {
    const card = Utils.renderAdaptiveCard(weekdayQuestionCard);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}
