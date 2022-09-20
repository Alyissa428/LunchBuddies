import { BotCommand } from "../helpers/botCommand";
import { MatchUserProfile } from "./MatchUserProfile";
import { ShowUserProfile } from "./showUserProfile";
import { WelcomeCommand } from "./welcome";

export const commands: BotCommand[] = [
  new ShowUserProfile(),
  new WelcomeCommand(),
  new MatchUserProfile(),
];
