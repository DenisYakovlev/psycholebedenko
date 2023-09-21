#!/bin/bash
sudo chmod -R 777 /home/ec2-user/

cd home/ec2-user/

echo "building app"

echo "starting app"
sudo docker-compose -f docker-compose.prod.yml up -d --build	

# manual bot start
# sudo docker exec -it -d backend python manage.py runbot