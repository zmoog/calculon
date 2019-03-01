import { inject, injectable } from "inversify";
import { ITogglService } from "../toggl/ITogglService";
import { map, join } from "lodash";


@injectable()
export class SummaryIntent {

    private togglService: ITogglService;

    constructor(
        @inject("TogglService") togglService: ITogglService) {
        this.togglService = togglService;
    }

    async execute(executionId: string, entities?: any): Promise<any> {

        let today = new Date();

        let summary = await this.togglService.summary(today, today);

        let r = map(summary.data, (s) => {
            return {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${s.title.project}*` + "\n * " + join(map(s.items, item => item.title.time_entry), "\n * ")
                }
            };
        });

        return {
            text: "Today on Toggl",
            blocks: r
        };
    }
}
