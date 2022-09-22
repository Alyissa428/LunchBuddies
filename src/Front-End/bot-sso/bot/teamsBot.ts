import {
  TeamsActivityHandler,
  TurnContext,
  SigninStateVerificationQuery,
  BotState,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
  MemoryStorage,
  ConversationState,
  UserState,
  ConsoleTranscriptLogger,
} from "botbuilder";
import { Utils } from "./helpers/utils";
import { SSODialog } from "./helpers/ssoDialog";
import { CommandsHelper } from "./helpers/commandHelper";
import { MatchCommand } from "./commands/matchUser";
import { User } from "./Back-End/user";
import { Json } from "adaptive-expressions/lib/builtinFunctions";
const rawNewUserCard = require("./adaptiveCards/newUser.json");
const rawLearnCard = require("./adaptiveCards/learn.json");
const rawMatchCard = require("./adaptiveCards/Match.json");
export var UserObj : {myUser: User} = {myUser: new User()};
const rawWeekdayCard = require("./adaptiveCards/weekday.json");
const rawSchoolCard = require("./adaptiveCards/school.json");
const rawOfficeCard = require("./adaptiveCards/officeLocation.json");
const rawOriginCard = require("./adaptiveCards/origin.json");
const rawLanguageCard = require("./adaptiveCards/language.json");
const rawAgeCard = require("./adaptiveCards/age.json");

export class TeamsBot extends TeamsActivityHandler {
  likeCountObj: { likeCount: number };
  conversationState: BotState;
  userState: BotState;
  dialog: SSODialog;
  dialogState: any;
  commandsHelper: CommandsHelper;
  match: MatchCommand;

  constructor() {
    super();

    // record the likeCount
    this.likeCountObj = { likeCount: 0 };

    // Define the state store for your bot.
    // See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
    // A bot requires a state storage system to persist the dialog and user state between messages.
    const memoryStorage = new MemoryStorage();

    // Create conversation and user state with in-memory storage provider.
    this.conversationState = new ConversationState(memoryStorage);
    this.userState = new UserState(memoryStorage);
    this.dialog = new SSODialog(new MemoryStorage());
    this.dialogState = this.conversationState.createProperty("DialogState");

    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");

      let txt = context.activity.text;
      // remove the mention of this bot
      const removedMentionText = TurnContext.removeRecipientMention(
        context.activity
      );
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }

      // Trigger command by IM text
      await CommandsHelper.triggerCommand(txt, {
        context: context,
        ssoDialog: this.dialog,
        dialogState: this.dialogState,
        likeCount: this.likeCountObj,

      });



      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = Utils.renderAdaptiveCard(rawNewUserCard);
          await context.sendActivity({ attachments: [card] });
          break;
        }
      }
      await next();
    });
  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(
    context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue
  ): Promise<AdaptiveCardInvokeResponse> {
    if (invokeValue.action.verb === "saveUser") {
      var val = invokeValue.action.data;
      var temp = JSON.parse(JSON.stringify(val));
      UserObj = {myUser: temp};

    }
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    if (invokeValue.action.verb === "userlike") {
      this.likeCountObj.likeCount++;
      const card = Utils.renderAdaptiveCard(rawLearnCard, this.likeCountObj);
      await context.updateActivity({
        type: "message",
        id: context.activity.replyToId,
        attachments: [card],
      });
    }
    else if (invokeValue.action.verb === "questionnaireSubmit") {
      this.match = new MatchCommand();
      const card = Utils.renderAdaptiveCard(rawMatchCard, this.match.matchObj);
      await context.sendActivity({ attachments: [card] });
      console.log("Finished context: ", context);
    }
    else if (invokeValue.action.data.text == "sendQuestionnaire" ) {
      console.log("Are we here?");
      const card = Utils.renderAdaptiveCard(rawOfficeCard);
      await context.sendActivity({ attachments: [card] });
    }
    else if (invokeValue.action.verb === "nextQuestion") {
      if (invokeValue.action.data.questionNumber == 2) {
        const card = Utils.renderAdaptiveCard(rawWeekdayCard);
        await context.sendActivity({ attachments: [card] });
      }
      else if (invokeValue.action.data.questionNumber == 3) {
        const card = Utils.renderAdaptiveCard(rawSchoolCard);
        await context.sendActivity({ attachments: [card] });
      }
      else if (invokeValue.action.data.questionNumber == 4) {
        const card = Utils.renderAdaptiveCard(rawOriginCard);
        await context.sendActivity({ attachments: [card] });
      }
      else if (invokeValue.action.data.questionNumber == 5) {
        const card = Utils.renderAdaptiveCard(rawLanguageCard);
        await context.sendActivity({ attachments: [card] });
      }
      else if (invokeValue.action.data.questionNumber == 6) {
        const card = Utils.renderAdaptiveCard(rawAgeCard);
        await context.sendActivity({ attachments: [card] });
      }
    }
    return { statusCode: 200, type: undefined, value: undefined };
  }

  async run(context: TurnContext) {
    await super.run(context);

    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversationState.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
  }

  async handleTeamsSigninVerifyState(
    context: TurnContext,
    query: SigninStateVerificationQuery
  ) {
    console.log(
      "Running dialog with signin/verifystate from an Invoke Activity."
    );
    await this.dialog.run(context, this.dialogState);
  }

  async handleTeamsSigninTokenExchange(
    context: TurnContext,
    query: SigninStateVerificationQuery
  ) {
    await this.dialog.run(context, this.dialogState);
  }

  async onSignInInvoke(context: TurnContext) {
    await this.dialog.run(context, this.dialogState);
  }
}
