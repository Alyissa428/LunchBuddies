import { BotCommand } from "../helpers/botCommand";
import { ShowUserProfile } from "./showUserProfile";
import { NewUserCommand } from "./newUser";
import { LearnCommand } from "./learn";
import { MatchCommand } from "./matchUser";

export const commands: BotCommand[] = [
  new ShowUserProfile(),
  new NewUserCommand(),
  new LearnCommand(),
  new MatchCommand(),
];
