import "reflect-metadata";
import { IMock, Times, Mock, It } from "typemoq";
import expect = require("expect.js");
import { TogglSummaryIntent } from "../../scripts/intent/TogglSummaryIntent";
import { ITogglService } from "../../scripts/toggl/ITogglService";


describe("TogglSummaryIntent, given an intent", () => {

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

        it("should return a warn message", async () => {

            let entities = {}; // no tags

            let response = await intent.execute("123", entities);

            console.log(`response: ${JSON.stringify(response)}`);

            expect(response.attachments).to.be.a("undefined");

            expect(response.text).to.be.eql("There are no entries today.");
        });
    });
    describe("when allentries have a project", () => {

        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../data/toggl/api/v2/summary/response.2019-03-10.json");
            });
        });

        it("should return a nice summary for each project", async () => {

            let entities = {}; // no tags

            let response = await intent.execute("123", entities);

            console.log(`response: ${JSON.stringify(response)}`);

            expect(response.text).to.be.eql("Today on Toggl");
            expect(response.blocks).to.have.length(3);
            expect(response.blocks[0]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Maintenance*\n * Chores"
                }
            });
            expect(response.blocks[1]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Professional development*\n * Calculon: automate build & deploy"
                }
            });
            expect(response.blocks[2]).to.be.eql({
                "type": "section",
                "text": {
                    "type": "mrkdwn", "text": "*Unknown*\n * Breakfast"
                }
            });

            // expect(response).to.be.eql({
            //     author_name: 'Osho',
            //     title: 'Le più belle frasi di Osho',
            //     text: 'Ciò che non ti uccide ti rompe li cojoni',
            //     color: '#d2dde1',
            //     image_url: 'https://i.ytimg.com/vi/XW1UhpJV_sQ/maxresdefault.jpg',
            //     mrkdwn_in: [Object],
            //     attachment_type: 'default'
            // });

            // // expect(response.resolved).to.be.true();
            // expect(response.client).to.be.eql("II B2B");
            // expect(response.project).to.be.eql("sito web");
            // expect(response.area).to.be.eql("frontend");
            // expect(response.hours).to.be.eql(0.5);
            // // expect(response.hours).to.be.greaterThan(0.4)
            // // expect(response.incomplete).to.be.false();

            // // expect(response).to.be.eql({
            // //     miss: [],
            // //     resolved: true,
            // //     client: 'II B2B',
            // //     project: 'sito web',
            // //     area: 'frontend',
            // //     hours: 0.5,
            // //     score: 1,
            // //     incomplete: true
            // // });

        });
    });


});
