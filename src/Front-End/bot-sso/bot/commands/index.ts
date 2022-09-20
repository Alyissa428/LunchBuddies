import { BotCommand } from "../helpers/botCommand";
import { MatchUserProfile } from "./MatchUserProfile";
import { ShowUserProfile } from "./showUserProfile";
import { NewUserCommand } from "./newUser";
import { LearnCommand } from "./learn";
import { MatchCommand } from "./matchUserAdaptive";

export const commands: BotCommand[] = [
  new ShowUserProfile(),
  new NewUserCommand(),
  new MatchUserProfile(),
  new LearnCommand(),
  new MatchCommand(),
];
