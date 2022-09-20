import { BotCommand, SSOCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { CardFactory, TurnContext } from "botbuilder";
import {createMicrosoftGraphClient,TeamsFx} from "@microsoft/teamsfx";
import { Mixin } from 'ts-mixer';
import { GraphRequest } from "@microsoft/microsoft-graph-client";
import { JsonStringify } from "adaptive-expressions/lib/builtinFunctions";

const rawNewUserCard = require("../adaptiveCards/newUser.json");

export class NewUserCommand extends Mixin(BotCommand, SSOCommand) {
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

    // if (me) {
    //   const matchCard = CardFactory.thumbnailCard(
    //     " "+ `Woof! We found a lunch buddy for you today. \n You're logged in as ${me.displayName} \n (${me.userPrincipalName}). ${
    //       me.jobTitle ? `Your job title is: ${me.jobTitle}` : ""
    //     }` 
    //     );
    //     await context.sendActivity({ attachments: [matchCard] });
    //     await context.sendActivity(
    //       `You're logged in as ${me.displayName} (${me.userPrincipalName})${
    //         me.jobTitle ? `; your job title is: ${me.jobTitle}` : ""
    //       }.`
    //     );
    //   console.log("Found");
      
    // } else {
    //   await context.sendActivity(
    //     "Could not retrieve profile information from Microsoft Graph."
    //   );
    // }
  }

  // async run(parameters: any): Promise<any> {
  //   //this.operationWithSSOToken = this.showUserInfo;
    
  //   const card = Utils.renderAdaptiveCard(rawNewUserCard);
  //   // console.log("HERE!! " + this.myInfo);
  //   console.log("HERE!! " + JSON.stringify(this));
  //   return await parameters.context.sendActivity({ attachments: [card] });
    
  // }
}
