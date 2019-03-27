import { IModule, Intent, SlackConfig, FulfillmentHandlerV2 as FulfillmentHandler } from "dickbott";
import { interfaces } from "inversify";
import { ITogglService, TogglConfig } from "./toggl/ITogglService";
import { TogglService } from "./toggl/TogglService";
import { TogglSummaryIntent } from "./intent/TogglSummaryIntent";
import { ScheduledIntentHandler } from "./handlers/ScheduledIntentHandler";
import { OshoConfig, OshoIntent } from "./intent/OshoIntent";
import { Ec2StartIntent } from "./intent/EC2StartIntent";
import { Ec2StopIntent } from "./intent/EC2StopIntent";
import { Ec2DescribeIntent } from "./intent/Ec2Describe";
import { BasecampCommandHandler } from "./basecamp/BasecampCommandHandler";


export class Module implements IModule {

    modules = (container: interfaces.Container) => {

        // Configurations
        container.bind<TogglConfig>("TogglConfig").toConstantValue({
            workspaceId: process.env.TOGGL_WORKSPACE_ID,
            userAgent: process.env.TOGGL_USER_AGENT,
            apiToken: process.env.TOGGL_API_TOKEN
        });
        container.bind<SlackConfig>("SlackConfig").toConstantValue({
            botUserOAuthAccessToken: process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN,
            verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
            defaultChannel: process.env.SLACK_DEFAULT_CHANNEL
        });

        container.bind<OshoConfig>("OshoConfig").toConstantValue(require("../data/osho/phrases.json"));
        
        // // Services
        container.bind<ITogglService>("TogglService").to(TogglService).inSingletonScope();

        // // Handlers
        container.bind<ScheduledIntentHandler>("ScheduledIntentHandler").to(ScheduledIntentHandler).inSingletonScope();
        container.bind<FulfillmentHandler>("FulfillmentHandler").to(FulfillmentHandler).inSingletonScope();
        container.bind<BasecampCommandHandler>("BasecampCommandHandler").to(BasecampCommandHandler).inSingletonScope();

        // // Intents
        container.bind<Intent<any, any>>("Intent").to(TogglSummaryIntent).whenTargetNamed("TogglSummaryIntent");
        container.bind<Intent<any, any>>("Intent").to(OshoIntent).whenTargetNamed("OshoIntent");
        container.bind<Intent<any, any>>("Intent").to(Ec2StartIntent).whenTargetNamed("Ec2StartIntent");
        container.bind<Intent<any, any>>("Intent").to(Ec2StopIntent).whenTargetNamed("Ec2StopIntent");
        container.bind<Intent<any, any>>("Intent").to(Ec2DescribeIntent).whenTargetNamed("Ec2DescribeIntent");
    }
}
