import "reflect-metadata";
import { IMock, Times, Mock, It } from "typemoq";
import expect = require("expect.js");
import { TogglSummaryIntent, TogglSummaryEntities } from "../../../scripts/intent/TogglSummaryIntent";
import { ITogglService } from "../../../scripts/toggl/ITogglService";
import * as moment from "moment";


describe("TogglSummaryIntent, given a summary from Toggl", () => {

    let togglService: IMock<ITogglService>;
    let intent: TogglSummaryIntent; 

    beforeEach(() => {
        togglService = Mock.ofType<ITogglService>();
        intent = new TogglSummaryIntent(togglService.object);
    });

    describe("when the entitis does not contains a date", () => {
        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../../data/toggl/api/v2/summary/response.today.json");
            });
        });        
        it("should use today's date", async () => {
            let entities = {}; // no tags
            let response = await intent.execute("123", entities);

            expect(response.text).to.contain(`Toggl Summary for ${moment().format("dddd, MMMM Do YYYY")}`);
            expect(response.attachments).to.have.length(1);
            expect(response.attachments[0]).to.be.eql({
                "title": "Professional development",
                "text": " * Calculon: automate build & deploy (2 hours)", // 2 hours and 1 minute
                mrkdwn_in: ["text"]
            });
        });
    });

    describe("when the entitis does contains a date", () => {
        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../../data/toggl/api/v2/summary/response.2019-03-10.json");
            });
        });        
        it("should use the specific date", async () => {
            let entities: TogglSummaryEntities = {
                day: "2019-03-10"
            };
            let response = await intent.execute("123", entities);

            expect(response.text).to.be.eql("Toggl Summary for Sunday, March 10th 2019");
            expect(response.attachments).to.have.length(3);
            expect(response.attachments[0]).to.be.eql({
                "title": "Maintenance",
                "text": " * Chores (2 hours)", // 1 hour and 44 minutes
                mrkdwn_in: ["text"]
            });
            expect(response.attachments[1]).to.be.eql({
                "title": "Professional development",
                "text": " * Calculon: automate build & deploy (2 hours)", // 2 hours and 1 minute
                
                mrkdwn_in: ["text"]
            });
            expect(response.attachments[2]).to.be.eql({
                "title": "Unknown",
                "text": " * Breakfast (an hour)", // 1 hour and 6 minutes
                mrkdwn_in: ["text"]
            });
        });
    });

    describe("when the summary has no entries", () => {

        beforeEach(() => {
            togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
                return require("../../../data/toggl/api/v2/summary/response.tomorrow.json")
            });
        });

        it("should return an informative message and no attachments or blocks", async () => {

            let entities = {}; // no tags
            let response = await intent.execute("123", entities);

            expect(response.attachments).to.be.a("undefined");
            expect(response.attachments).to.be.a("undefined");
            expect(response.text).to.contain("There are no entries for");
        });
    });

    // describe("when all summary entries have a project", () => {

    //     beforeEach(() => {
    //         togglService.setup(t => t.summary(It.isAny(), It.isAny())).returns(async r => {
    //             return require("../../../data/toggl/api/v2/summary/response.2019-03-10.json");
    //         });
    //     });

    //     it("should return a nice summary for each project", async () => {

    //         let entities = {}; // no tags
    //         let response = await intent.execute("123", entities);

    //         expect(response.text).to.be.eql("Today on Toggl");
    //         expect(response.attachments).to.have.length(3);
    //         expect(response.attachments[0]).to.be.eql({
    //             "title": "Maintenance",
    //             "text": " * Chores (2 hours)", // 1 hour and 44 minutes
    //             mrkdwn_in: ["text"]
    //         });
    //         expect(response.attachments[1]).to.be.eql({
    //             "title": "Professional development",
    //             "text": " * Calculon: automate build & deploy (2 hours)", // 2 hours and 1 minute
                
    //             mrkdwn_in: ["text"]
    //         });
    //         expect(response.attachments[2]).to.be.eql({
    //             "title": "Unknown",
    //             "text": " * Breakfast (an hour)", // 1 hour and 6 minutes
    //             mrkdwn_in: ["text"]
    //         });
    //     });
    // });


});
