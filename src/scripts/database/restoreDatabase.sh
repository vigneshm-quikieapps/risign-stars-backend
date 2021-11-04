#!/bin/sh
MONGODB_URL_ENV_LINE=$(grep MONGODB_URL .env)
MONGODB_URL=$(echo $MONGODB_URL_ENV_LINE | cut -d'=' -f2-)

# this works on linux
# mongorestore --uri $MONGODB_URL

# this works on mac
mongorestore --uri $MONGODB_URL dump/risingStarDev