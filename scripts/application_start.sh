#!/bin/bash
sudo chmod -R 777 /home/ec2-user/

cd home/ec2-user/

sudo docker-compose up -d
sudo docker exec -it -d backend python manage.py runbot