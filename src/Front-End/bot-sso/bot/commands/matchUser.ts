import { User } from "../Back-End/user";
import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
import { TeamsBot } from "../teamsBot";
const rawLearnCard = require("../adaptiveCards/match.json");

import {UserObj} from "../teamsBot";

export class MatchCommand extends BotCommand {
  matchObj: { firstname: string, 
    lastname: string, 
    title: string, 
    team: string, 
    location: string,
    favoriteFood: string,
    hobbies: string,
    compatibilityScore: string,
    email: string,
    newMessage: string
    //imagePatch: string
  };
  constructor() {
    super();
    this.matchPatterns = [/^\s*find a lunch buddy\s*/];
    this.matchObj = { firstname: "Alyissa", 
      lastname: "Sanders",
      title: "Software Engineer", 
      team: "Azure Networking", 
      location: "Atlanta, GA",
      favoriteFood: "Italian",
      hobbies: "Hiking",
      compatibilityScore: "75" + "%",
      email: "alsanders@microsoft.com",
      newMessage: "hello"
      //imagePatch: ""
    };
  }

  public async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    this.matchObj = { firstname: "Chris",
      lastname: "Jenkins",
      title: "Software Engineer",
      team: "Azure Networking",
      location: "Atlanta, GA",
      favoriteFood: "BBQ",
      hobbies: "Basketball",
      compatibilityScore: "90" + "%",
      email: "chrisjenkins@microsoft.com",
      newMessage: "hello"
    };
    const card2 = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    this.matchObj = { firstname: "John",
      lastname: "Feshuk",
      title: "Software Engineer",
      team: "Azure Storage",
      location: "Atlanta, GA",
      favoriteFood: "Mexican",
      hobbies: "Basketball",
      compatibilityScore: "40" + "%",
      email: "johnfeshuk@microsoft.com",
      newMessage: "hello"
    };
    const card3 = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    console.log(" MatchUser: UserObj", UserObj);
    
    return await parameters.context.sendActivity({ attachments: [card, card2, card3] });
  }
}