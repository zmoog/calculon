import "reflect-metadata";
import { Callback, Context, Handler } from 'aws-lambda';
import { DickBottEngine, FulfillmentHandlerV2 as FulfillmentHandler } from "dickbott";
import { Module } from "../scripts/Module";


let engine = new DickBottEngine();
engine.register(new Module());

export const handler: Handler = async (event: any, context: Context, cb: Callback) => {

    console.log(event, context);

    let request = JSON.parse(event.body);

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(await engine.getService<FulfillmentHandler>("FulfillmentHandler").handle(request))
      };

    console.log(response);

    cb(null, response);
}
