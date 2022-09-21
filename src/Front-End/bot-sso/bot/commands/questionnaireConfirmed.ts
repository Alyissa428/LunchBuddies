import { BotCommand, SSOCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { CardFactory, TurnContext } from "botbuilder";
import {createMicrosoftGraphClient,TeamsFx} from "@microsoft/teamsfx";
import { Mixin } from 'ts-mixer';
import { GraphRequest } from "@microsoft/microsoft-graph-client";
import { JsonStringify } from "adaptive-expressions/lib/builtinFunctions";

const rawQuestionnaireConfirmed = require("../adaptiveCards/questionnaireConfirmed.json");

export class QuestionnaireConfirmedCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*questionnaire submitted\s*/];
  }
 
  async run(parameters: any) {
    // Call Microsoft Graph half of user

    const card = Utils.renderAdaptiveCard(rawQuestionnaireConfirmed);
    await parameters.context.sendActivity({ attachments: [card] });
  }
}
