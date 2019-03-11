# Toggl

## API

### Summary

```bash
$ curl -v -u "${TOGGL_API_TOKEN}:api_token" -X GET "https://toggl.com/reports/api/v2/summary?workspace_id=123&since=2019-03-10&until=2019-03-10&user_agent=maurizio.branca@gmail.com"
{
  "total_grand": 17549264,
  "total_billable": 0,
  "total_currencies": [
    {
      "currency": "EUR",
      "amount": 0
    }
  ],
  "data": [
    {
      "id": 28041930,
      "title": {
        "project": "Maintenance",
        "client": "Me",
        "color": "0",
        "hex_color": "#06aaf5"
      },
      "time": 6253264,
      "total_currencies": [
        {
          "currency": "EUR",
          "amount": 0
        }
      ],
      "items": [
        {
          "title": {
            "time_entry": "Chores"
          },
          "time": 6253264,
          "cur": "EUR",
          "sum": 0,
          "rate": 0
        }
      ]
    },
    {
      "id": 95029662,
      "title": {
        "project": "Professional development",
        "client": "Me",
        "color": "0",
        "hex_color": "#c7741c"
      },
      "time": 7308000,
      "total_currencies": [
        {
          "currency": "EUR",
          "amount": 0
        }
      ],
      "items": [
        {
          "title": {
            "time_entry": "Calculon: automate build & deploy"
          },
          "time": 7308000,
          "cur": "EUR",
          "sum": 0,
          "rate": 0
        }
      ]
    },
    {
      "id": null,
      "title": {
        "project": null,
        "client": null,
        "color": "0",
        "hex_color": null
      },
      "time": 3988000,
      "total_currencies": [
        {
          "currency": "EUR",
          "amount": 0
        }
      ],
      "items": [
        {
          "title": {
            "time_entry": "Breakfast"
          },
          "time": 3988000,
          "cur": "EUR",
          "sum": 0,
          "rate": 0
        }
      ]
    }
  ]
}


```

### Workspaces

```bash
$ curl -u "${TOGGL_API_TOKEN}:api_token" -X GET https://www.toggl.com/api/v8/workspaces | jq
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
