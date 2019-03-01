import { inject, injectable } from "inversify";
import { TogglConfig, ITogglService } from "./ITogglService";
import * as request from "request-promise-native";
import * as moment from "moment";

// https://github.com/toggl/toggl_api_docs


@injectable()
export class TogglService implements ITogglService {

    private config: TogglConfig;

    constructor(
        @inject("TogglConfig") config: TogglConfig) {
        this.config = config;
    }

    // https://github.com/toggl/toggl_api_docs/blob/master/reports/summary.md
    async summary(since: Date, until: Date): Promise<any> {

        let summary = await request.get({
            uri: `https://toggl.com/reports/api/v2/summary?workspace_id=${this.config.workspaceId}&since=${moment(since).format('YYYY-MM-DD')}&until=${moment(until).format('YYYY-MM-DD')}&user_agent=${this.config.userAgent}`,
            json: true
        }).auth(this.config.apiToken, "api_token", true);

        return summary;
    }
}
