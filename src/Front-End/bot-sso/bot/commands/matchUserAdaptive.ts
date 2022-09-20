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
    compatibilityScore: string
    //imagePatch: string
  };
  constructor() {
    super();
    this.matchPatterns = [/^\s*match\s*/];
    this.matchObj = { firstname: "John", 
      lastname: "Doe",
      title: "Software Engineer", 
      team: "Azure SQL", 
      location: "Atlanta, GA",
      favoriteFood: "Mexican",
      hobbies: "Hiking",
      compatibilityScore: "90" + "%",
      //imagePatch: ""
    };
  }

  async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawLearnCard, this.matchObj);
    return await parameters.context.sendActivity({ attachments: [card] });
  }
}