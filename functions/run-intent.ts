import "reflect-metadata";
import { Callback, Context, Handler } from 'aws-lambda';
import { DickBottEngine } from "dickbott";
import { Module } from "../scripts/Module";
import { ScheduledRequest, ScheduledIntentHandler } from "../scripts/handlers/ScheduledIntentHandler";


let engine = new DickBottEngine();
engine.register(new Module());

export const handler: Handler = async (event: ScheduledRequest, context: Context, cb: Callback) => {

    console.log(event, context);

    await engine.getService<ScheduledIntentHandler>("ScheduledIntentHandler").handle(event);

    let response = {
        statusCode: 200,
        body: JSON.stringify({ completed: true })
    };

    console.log(response);

    cb(null, response);
}
