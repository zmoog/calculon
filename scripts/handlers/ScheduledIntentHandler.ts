import { IntentDispatcher, ISlackWebAPI } from "dickbott";
import { inject, injectable } from "inversify";


@injectable()
export class ScheduledIntentHandler {

    constructor(
        @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher,
        @inject("SlackWebAPI") private slackWebAPI: ISlackWebAPI
    ) { }

    async handle(event: ScheduledRequest): Promise<void> {

        console.log("event: %j", event);
        
        try {
            
            let message = await this.intentDispatcher.dispatch<any, any>(
                event.name,
                event.entities);
                
            console.log("message: %j", message);

            if (message) {
                await this.slackWebAPI.postMessage(message);
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export class ScheduledRequest {
    name: string
    entities: any
}
