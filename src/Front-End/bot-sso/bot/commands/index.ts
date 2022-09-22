import { BotCommand } from "../helpers/botCommand";
import { ShowUserProfile } from "./showUserProfile";
import { NewUserCommand } from "./newUser";
import { LearnCommand } from "./learn";
import { MatchCommand } from "./matchUser";
import {QuestionnaireConfirmedCommand} from "./questionnaireConfirmed";
import { OriginCommand } from "./origin";
import { LanguageCommand } from "./language";
import { AgeCommand } from "./age";
import { WeekdayCommand } from "./weekday";
import { OfficeLocationCommand } from "./officeLocation";
import { SchoolCommand } from "./school";

export const commands: BotCommand[] = [
  new ShowUserProfile(),
  new NewUserCommand(),
  new LearnCommand(),
  new MatchCommand(),
  new QuestionnaireConfirmedCommand(),
  new OriginCommand(),
  new LanguageCommand(),
  new AgeCommand(),
  new WeekdayCommand(),
  new OfficeLocationCommand(),
  new SchoolCommand()
];
