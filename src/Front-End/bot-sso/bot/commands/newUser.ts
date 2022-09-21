import { BotCommand, SSOCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { CardFactory, TurnContext } from "botbuilder";
import {createMicrosoftGraphClient,TeamsFx} from "@microsoft/teamsfx";
import { GraphRequest } from "@microsoft/microsoft-graph-client";

const rawNewUserCard = require("../adaptiveCards/newUser.json");

export class NewUserCommand extends SSOCommand {
  myInfo: GraphRequest
  constructor() {
    super();
    this.matchPatterns = [/^\s*new user\s*/];
    this.operationWithSSOToken = this.showUserInfo;
  }
 
  async showUserInfo(context: TurnContext, ssoToken: string) {
    // Call Microsoft Graph half of user
    const teamsfx = new TeamsFx().setSsoToken(ssoToken);
    const graphClient = createMicrosoftGraphClient(teamsfx, [
      "User.Read",
    ]);
    const me = await graphClient.api("/me").get();
    console.log("HERE 1: ", me);
    this.myInfo = me;
    console.log("HERE 2: ", this.myInfo);
    const card = Utils.renderAdaptiveCard(rawNewUserCard);
    await context.sendActivity({ attachments: [card] });
  }
}
