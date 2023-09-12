#!/bin/bash

MONGO_HOST="localhost"
MONGO_PORT="27017"
DATABASE_NAME="open_charge_map"
COLLECTION_NAME="charging_stations"

# Check if the database exists
dbExists=$(mongosh --host $MONGO_HOST --port $MONGO_PORT --eval "db.getMongo().getDBNames().indexOf('$DATABASE_NAME') > -1" --quiet)

if [ "$dbExists" == "false" ]; then
  echo "Database '$DATABASE_NAME' does not exist. Creating it..."
  mongosh --host $MONGO_HOST --port $MONGO_PORT --eval "use $DATABASE_NAME"
fi

# Check if the collection exists
collectionExists=$(mongosh --host $MONGO_HOST --port $MONGO_PORT $DATABASE_NAME --eval "db.getCollectionNames().indexOf('$COLLECTION_NAME') > -1" --quiet)

if [ "$collectionExists" == "false" ]; then
  echo "Collection '$COLLECTION_NAME' does not exist. Creating it..."
  mongosh --host $MONGO_HOST --port $MONGO_PORT $DATABASE_NAME --eval "db.createCollection('$COLLECTION_NAME')"
fi

echo "Initialization complete."
