import "reflect-metadata";
// import { IMock, Times, Mock, It } from "typemoq";
import expect = require("expect.js");
// import { DickBottEngine } from "dickbott";
// import { Module } from "../../scripts/Module";
import { OshoIntent } from "../../../scripts/intent/OshoIntent";


// let engine = new DickBottEngine();
// engine.register(new Module());

let oshoIntent = new OshoIntent({
    phrases: [{
        text: "Ciò che non ti uccide ti rompe li cojoni",
        image_url: "https://i.ytimg.com/vi/XW1UhpJV_sQ/maxresdefault.jpg"
    }]
})

describe("OshoIntent, given an OshoEntity entity", () => {

    describe("when the entity contains no tag", () => {

        it("should return a random URL", async () => {

            let entities = {}; // no tags

            let response = await oshoIntent.execute("123", entities);

            expect(response.attachments).to.not.be.empty();

            expect(response.attachments[0].author_name).to.be.eql("Osho");
            expect(response.attachments[0].text).to.be.eql("Ciò che non ti uccide ti rompe li cojoni");
            expect(response.attachments[0].image_url).to.be.eql("https://i.ytimg.com/vi/XW1UhpJV_sQ/maxresdefault.jpg");

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

    // describe("when the client is a multi-word string", () => {

    //     it("should return the corrent entity", async () => {

    //         // let text = "- Valentina Laganà - risoluzione bug - backend - Controllare indirizzo email e-shop (1)"

    //         // let response = await dialogflow.query(text);

    //         // expect(response.miss).to.be.empty();
    //         // expect(response.client).to.be.eql("Valentina Laganà");
    //         // expect(response.project).to.be.eql("risoluzione bug");
    //         // expect(response.area).to.be.eql("backend");
    //         // expect(response.hours).to.be.eql(1);
    //     });
    // });

    // describe("when the client contains a URL", () => {

    //     it("should return the corrent entity", async () => {

    //         // let text = "- Weblinux - sistema - infrastruttura - Creazione ambiente http://daimoneventi.it (1)"

    //         // let response = await dialogflow.query(text);

    //         // expect(response.miss).to.be.empty();
    //         // expect(response.client).to.be.eql("Weblinux");
    //         // expect(response.project).to.be.eql("sistema");
    //         // expect(response.area).to.be.eql("Infrastruttura");
    //         // expect(response.hours).to.be.eql(1);
    //     });
    // });


});
