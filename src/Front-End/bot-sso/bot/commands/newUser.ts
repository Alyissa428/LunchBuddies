import { BotCommand, SSOCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { CardFactory, TurnContext } from "botbuilder";
import {createMicrosoftGraphClient,TeamsFx} from "@microsoft/teamsfx";
import { GraphRequest } from "@microsoft/microsoft-graph-client";
import { User } from "../Back-End/user";
import { Console } from "console";
import { QuestionController } from "../Back-End/QuestionController";


const rawNewUserCard = require("../adaptiveCards/newUser.json");
var questionController = new QuestionController();

export class NewUserCommand extends SSOCommand {
  myInfo: GraphRequest
  myUser: User
  //questionController : QuestionController
  constructor() {
    super();
    //this.questionController = new QuestionController();
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
    this.myInfo = me;
    this.myUser = new User(me.displayName, me.mail, me.officeLocation, me.jobTitle);
    questionController.addUser(this.myUser);
    console.log("My Info: ", this.myInfo);
    const card = Utils.renderAdaptiveCard(rawNewUserCard);
    await context.sendActivity({ attachments: [card] });
  }
}
