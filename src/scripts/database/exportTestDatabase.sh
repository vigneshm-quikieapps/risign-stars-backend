#!/bin/sh
MONGODB_TEST_URL_ENV_LINE=$(grep MONGODB_TEST_URL .env)
MONGODB_TEST_URL=$(echo $MONGODB_TEST_URL_ENV_LINE | cut -d'=' -f2-)
mongodump --uri $MONGODB_TEST_URL