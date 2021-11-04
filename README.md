# ISmartApps - Rising Stars


## Pre-requisites
- node
- npm

### Initial Setup Guide
- Clone this repo
- npm i (shorthand for npm install)
- cp .env.example .env
- fill all the values in .env file

### Starting the Server in Development
- `npm run dev`

### Starting the Server in Production
- `npm start`

## FAQ
1. Email not working?
check if `SENDGRID_API_KEY` is set in .env file

2. SMS is not working?
check if the following are set in .env file: 
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN` 
- `TWILIO_MESSAGING_SERVICE_ID`

3. OTP is not working?
check if redis if configured properly in .env file
- `REDIS_HOSTNAME`
- `REDIS_PORT`
- `REDIS_PASSWORD`
- `REDIS_DB`

4. How can I view the redis database?
- `npm run redis-gui`
- now open `localhost:8081` or the url displayed in the console in your `browser`

5. How to dump database from mongodb?
- `mongodump --uri 'URI_TO_MONGODB_DATABASE'`
- or you can use the command `npm run db-dump`.
Note: make sure `MONGODB_URL` is set in .env file before using the command `npm run db-dump`