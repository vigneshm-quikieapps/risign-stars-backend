#!/bin/sh
MONGODB_TEST_URL_ENV_LINE=$(grep MONGODB_TEST_URL .env)
MONGODB_TEST_URL=$(echo $MONGODB_TEST_URL_ENV_LINE | cut -d'=' -f2-)

# this works on linux
# mongorestore --uri $MONGODB_URL

# this works on mac
mongorestore --drop --uri $MONGODB_TEST_URL dump/risingStar