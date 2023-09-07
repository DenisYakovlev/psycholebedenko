#!/bin/bash
sudo chmod -R 777 /home/ec2-user/

cd home/ec2-user/

echo "building app"
# sudo docker-compose build

echo "starting app"
sudo docker-compose -f docker-compose.prod.yml up -d --build	
sudo docker exec -it -d backend python manage.py runbot