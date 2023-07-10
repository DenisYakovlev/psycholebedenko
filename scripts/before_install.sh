#!/bin/bash

echo "starting before_install.sh"

# install docker
echo "installing docker"

sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Enable docker service at boot time
sudo systemctl enable docker.service
sudo systemctl start docker.service

echo "docker setup done"

# install docker-compose
echo "installing docker-compose" 

sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# set docker path
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

echo "docker-compose setup done"

echo "before_install.sh done"