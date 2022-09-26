import { BotCommand } from "../helpers/botCommand";
import { NewUserCommand } from "./newUser";
import { MatchCommand } from "./matchUser";
import {QuestionnaireConfirmedCommand} from "./questionnaireConfirmed";
import { OriginCommand } from "./origin";
import { LanguageCommand } from "./language";
import { AgeCommand } from "./age";
import { WeekdayCommand } from "./weekday";
import { OfficeLocationCommand } from "./officeLocation";
import { SchoolCommand } from "./school";

export const commands: BotCommand[] = [
  new NewUserCommand(),
  new MatchCommand(),
  new QuestionnaireConfirmedCommand(),
  new OriginCommand(),
  new LanguageCommand(),
  new AgeCommand(),
  new WeekdayCommand(),
  new OfficeLocationCommand(),
  new SchoolCommand()
];
