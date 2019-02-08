import "reflect-metadata";
import { Callback, Context, Handler } from 'aws-lambda';
import { DickBottEngine } from "dickbott";
// import { ScheduledIntentHandler, ScheduledRequest } from "../handlers/ScheduledIntentHandler";
// import { Module } from "../Module";

let engine = new DickBottEngine();
// engine.register(new Module());


export const handler: Handler = async (event: any, context: Context, cb: Callback) => {

    console.log(event, context);

    // await engine.getService<ScheduledIntentHandler>("ScheduledIntentHandler").handle(event);

    let response = {
        statusCode: 200,
        body: JSON.stringify({ completed: true, token: process.env.TOGGL_API_TOKEN })
    };

    console.log(response);

    cb(null, response);
}