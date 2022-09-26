import { BotCommand, SSOCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { CardFactory, TurnContext } from "botbuilder";
import {createMicrosoftGraphClient,TeamsFx} from "@microsoft/teamsfx";
import { GraphRequest } from "@microsoft/microsoft-graph-client";
import { User } from "../Back-End/user";
import { Console } from "console";
import { makeDummyQuestionController, QuestionController } from "../Back-End/QuestionController";
export var DummyObj : {myController : QuestionController} = {myController: makeDummyQuestionController()};


const rawNewUserCard = require("../adaptiveCards/newUser.json");
var myUserObj : {myUser : User} = {myUser : new User()};

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
    this.myInfo = me;
    myUserObj.myUser = new User(me.displayName, me.mail, me.officeLocation, me.jobTitle);
    DummyObj.myController.addUser(myUserObj.myUser);
    console.log("Dummy Obj User: ", DummyObj.myController.getUsers());
    console.log("DummyObj", DummyObj.myController);
    const card = Utils.renderAdaptiveCard(rawNewUserCard, myUserObj);
    await context.sendActivity({ attachments: [card] });
  }
}
