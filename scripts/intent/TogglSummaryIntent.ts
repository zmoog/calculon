import { inject, injectable } from "inversify";
import { ITogglService } from "../toggl/ITogglService";
import { map, join } from "lodash";
import { SlackMessage } from "dickbott";
import * as moment from "moment";


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

        let blocks = map(summary.data, (entry) => {
            return {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${entry.title.project||'Unknown'}*` + "\n * " + join(map(entry.items, item => `${item.title.time_entry} (${moment.duration({millisecond: item.time}).humanize()})`), `\n * `)
                }
            };
        });

        return {
            text: "Today on Toggl",
            blocks: blocks
        };
    }
}
