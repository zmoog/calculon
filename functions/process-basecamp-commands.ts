import "reflect-metadata";
import { Callback, Context, Handler, APIGatewayEvent } from 'aws-lambda';
import { DickBottEngine } from "dickbott";
import { Module } from "../scripts/Module";
// import { BasecampCommandRequest } from "../scripts/basecamp/Types";
import { BasecampCommandHandler } from "../scripts/basecamp/BasecampCommandHandler";


let engine = new DickBottEngine();
engine.register(new Module());

export const handler: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {

    console.log(event, context);

    let command = JSON.parse(event.body);

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(await engine.getService<BasecampCommandHandler>("BasecampCommandHandler").handle(command))
      };

    console.log(response);

    cb(null, response);
}
