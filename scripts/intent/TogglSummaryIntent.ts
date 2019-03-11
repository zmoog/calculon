import { inject, injectable } from "inversify";
import { ITogglService } from "../toggl/ITogglService";
import { map, join } from "lodash";
import { SlackMessage } from "dickbott";


@injectable()
export class TogglSummaryIntent {

    private togglService: ITogglService;

    constructor(
        @inject("TogglService") togglService: ITogglService) {
            console.log(`TogglSummaryIntent::constructor: ${togglService}`);
        this.togglService = togglService;
    }

    async execute(executionId: string, entities?: any): Promise<SlackMessage> {

        let today = new Date();

        let summary = await this.togglService.summary(today, today);

        if (summary.data === undefined || summary.data.length == 0) {
            return {
                text: "There are no entries today."
            }
        }

        let blocks = map(summary.data, (s) => {
            return {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${s.title.project||'Unknown'}*` + "\n * " + join(map(s.items, item => item.title.time_entry), "\n * ")
                }
            };
        });

        return {
            text: "Today on Toggl",
            blocks: blocks
        };
    }
}
