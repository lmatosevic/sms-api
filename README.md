# SMS api
> API layer which provides actions to perform on the sms-core server and other utility tasks. Uses the MySQL database to keep records of communication.

# Requirements
- Accessible and started sms-core service with established serial connection with GPRS shield
- Created configuration file _./resources/config.json_ according to example from _config-example.json_

# Starting server
Run `npm install` & `npm run start`

# API endpoints

| Endpoint                 | HTTP method | Body content                    | Return body                       |
|:-------------------------|:------------|:--------------------------------|:----------------------------------|
| /sms/check               | GET         | {}                              | { result: string, error: string } |
| /sms/send/{to}/{message} | GET         | {}                              | { result: string, error: string } |
| /sms/send                | POST        | { to: string, message: string } | { result: string, error: string } |

_* With every request send username & password using BasicAuth protocol (e.g. username=admin&password=secret)_
