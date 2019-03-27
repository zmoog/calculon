import { inject, injectable } from "inversify";
import { ITogglService } from "../toggl/ITogglService";
import { SlackMessage, Attachment } from "dickbott";
import { map, join } from "lodash";
import * as moment from "moment";


@injectable()
export class TogglSummaryIntent {

    private togglService: ITogglService;

    constructor(
        @inject("TogglService") togglService: ITogglService) {
        console.log(`TogglSummaryIntent::constructor: ${togglService}`);
        this.togglService = togglService;
    }

    async execute(executionId: string, entities?: TogglSummaryEntities): Promise<SlackMessage> {

        let day = entities.day ? new Date(entities.day) : new Date();

        let summary = await this.togglService.summary(day, day);

        if (summary.data === undefined || summary.data.length == 0) {
            return {
                text: `There are no entries for ${moment(day).format("dddd, MMMM Do YYYY")}`
            }
        }

        let attachments: Attachment[] = map(summary.data, (entry) => {
            return {
                title: `${entry.title.project || 'Unknown'}`,
                text: " * " + join(map(entry.items, item => `${item.title.time_entry} (${moment.duration({ millisecond: item.time }).humanize()})`), `\n * `),
                mrkdwn_in: ["text"]
            };
        });

        return {
            text: `Toggl Summary for ${moment(day).format("dddd, MMMM Do YYYY")}`,
            attachments: attachments
        };
    }
}

export class TogglSummaryEntities {
    day?: string
}
