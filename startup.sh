#!/bin/bash

NETWORK="cs_network"

if [ ! "$(docker network ls | grep $NETWORK)" ]; then
  echo "Creating $NETWORK..."
  docker network create $NETWORK
else
  echo "$NETWORK is already exist."
fi

echo "Building..."
docker-compose build --no-cache

echo "Starting containers..."
docker-compose up -d

echo "Status:"
docker ps
