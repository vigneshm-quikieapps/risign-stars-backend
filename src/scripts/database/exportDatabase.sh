#!/usr/bin/bash
MONGODB_URL_ENV_LINE=$(grep MONGODB_URL .env)
MONGODB_URL=$(echo $MONGODB_URL_ENV_LINE | cut -d'=' -f2-)
echo $MONGODB_URL
mongodump --uri $MONGODB_URL