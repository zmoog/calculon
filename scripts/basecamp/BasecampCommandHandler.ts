import { IntentDispatcher } from "dickbott";
import { inject, injectable } from "inversify";
// import { IIntentRepository } from "../core/intent/IIntentRepository";
// import { assignIn } from "lodash";
import { BasecampCommandRequest } from "./Types";


@injectable()
export class BasecampCommandHandler {

    constructor(
        @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher
        ) { }

    async handle(event: BasecampCommandRequest): Promise<string> {
        // console.log(`I've received the command ${event.command} from the user ${event.creator.name}`);
        return `I've received the command <b>${event.command}</b> from the user <b>${event.creator.name}</b> (stocazzo!)`;
    }
}
