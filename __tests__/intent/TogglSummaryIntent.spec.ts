import "reflect-metadata";
import { IMock, Times, Mock, It } from "typemoq";
import expect = require("expect.js");
import { TogglSummaryIntent } from "../../scripts/intent/TogglSummaryIntent";
import { ITogglService } from "../../scripts/toggl/ITogglService";


describe("TogglSummaryIntent, given a summary from Toggl", () => {

    let togglService: IMock<ITogglService>;
    let intent: TogglSummaryIntent; 

    beforeEach(() => {
        togglService = Mock.ofType<ITogglService>();
        intent = new TogglSummaryIntent(togglService.object);
    });

    describe("when the summary has no entries", () => {

        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../data/toggl/api/v2/summary/response.tomorrow.json")
            });
        });

        it("should return an informative message and no attachments or blocks", async () => {

            let entities = {}; // no tags
            let response = await intent.execute("123", entities);

            expect(response.attachments).to.be.a("undefined");
            expect(response.blocks).to.be.a("undefined");
            expect(response.text).to.be.eql("There are no entries today.");
        });
    });

    describe("when all summary entries have a project", () => {

        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../data/toggl/api/v2/summary/response.2019-03-10.json");
            });
        });

        it("should return a nice summary for each project", async () => {

            let entities = {}; // no tags
            let response = await intent.execute("123", entities);

            expect(response.text).to.be.eql("Today on Toggl");
            expect(response.blocks).to.have.length(3);
            expect(response.blocks[0]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Maintenance*\n * Chores (2 hours)" // 1 hour and 44 minutes
                }
            });
            expect(response.blocks[1]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Professional development*\n * Calculon: automate build & deploy (2 hours)" // 2 hours and 1 minute
                }
            });
            expect(response.blocks[2]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn", "text": "*Unknown*\n * Breakfast (an hour)" // 1 hour and 6 minutes
                }
            });
        });
    });


});
