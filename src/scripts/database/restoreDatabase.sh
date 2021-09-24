#!/usr/bin/bash
MONGODB_BACKUP_DEV_ENV_LINE_URL=$(grep MONGODB_URL_BACKUP_DEV .env)
MONGODB_BACKUP_DEV_URL=$(echo $MONGODB_URL_BACKUP_DEV_ENV_LINE | cut -d'=' -f2-)
echo $MONGODB_URL_BACKUP_DEV
mongorestore --uri $MONGODB_URL_BACKUP_DEV