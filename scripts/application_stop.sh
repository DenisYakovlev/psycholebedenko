#!/bin/bash

echo "stopping docker-compose"

cd home/ec2-user/

sudo docker-compose -f docker-compose.prod.yml stop
sudo docker-compose -f docker-compose.prod.yml down