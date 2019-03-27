# Calculon

## Invoke Local

```bash
$ serverless invoke local --function run-intent --data '{"name":"TogglSummaryIntent", "entities": { "day": "2019-03-25"}}'
```

## Requirements

- [AWS](https://aws.amazon.com) account (for [API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/) functions)
- Google Cloud Platform account (for [Dialogflow](https://dialogflow.com))
- Node v8.10

You can run the bot using the free tier on both cloud providers.


## AWS Systems Manager

Seve the Toggl and Slack API tokens in the AWS Systems Manager using the Parameter Store:

```bash
$ aws ssm put-parameter --name calculon-dev-toggl-api-token --type String  --value xx --overwrite
$ aws ssm put-parameter --name calculon-dev-slack-bot-oauth-access-token --type String  --value "xyz" --overwrite 
```


```bash
$ aws ssm get-parameter --name calculon-dev-toggl-api-token
{
    "Parameter": {
        "Name": "calculon-dev-toggl-api-token",
        "Type": "String",
        "Value": "xxx",
        "Version": 3,
        "LastModifiedDate": 1549606553.596,
        "ARN": "arn:aws:ssm:eu-west-1:123456789:parameter/calculon-dev-toggl-api-token"
    }
}
```
