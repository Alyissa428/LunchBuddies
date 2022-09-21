import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
const rawLearnCard = require("../adaptiveCards/match.json");

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
    this.matchObj = { firstname: "John", 
      lastname: "Doe",
      title: "Software Engineer", 
      team: "Azure SQL", 
      location: "Atlanta, GA",
      favoriteFood: "Mexican",
      hobbies: "Hiking",
      compatibilityScore: "90" + "%",
      email: "johndoe@microsoft.com",
      newMessage: "hello"
      //imagePatch: ""
    };
  }

  public async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    const card2 = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    const card3 = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    return await parameters.context.sendActivity({ attachments: [card, card2, card3] });
  }
}