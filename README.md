# Calculon

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

## Toggl

```bash
$ curl -v -u "${TOGGL_API_TOKEN}:api_token" -X GET https://www.toggl.com/api/v8/workspaces
[
  {
    "id": 123,
    "name": "Maurizio Branca's workspace",
    "profile": 123,
    "premium": true,
    "admin": true,
    "default_hourly_rate": 0,
    "default_currency": "EUR",
    "only_admins_may_create_projects": false,
    "only_admins_see_billable_rates": false,
    "only_admins_see_team_dashboard": false,
    "projects_billable_by_default": false,
    "rounding": 1,
    "rounding_minutes": 0,
    "api_token": "yyy",
    "at": "2019-01-10T04:36:25+00:00",
    "logo_url": "https://assets.toggl.com/images/workspace.jpg",
    "ical_url": "/ical/workspace_user/zzz",
    "ical_enabled": true
  }
]
```