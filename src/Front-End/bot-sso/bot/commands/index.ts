import { BotCommand } from "../helpers/botCommand";
import { LearnCommand } from "./learn";
import { MatchUserProfile } from "./MatchUserProfile";
import { ShowUserProfile } from "./showUserProfile";
import { WelcomeCommand } from "./welcome";

export const commands: BotCommand[] = [
  new LearnCommand(),
  new ShowUserProfile(),
  new WelcomeCommand(),
  new MatchUserProfile(),
];
