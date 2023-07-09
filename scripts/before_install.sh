#!/bin/bash

echo "starting before_install.sh"

# install docker
echo "installing docker"

amazon-linux-extras install docker
service docker start
usermod -a -G docker ec2-user

# Enable docker service at boot time
systemctl enable docker.service
systemctl start docker.service

echo "docker setup done"

# install docker-compose
echo "installing docker-compose" 

curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "docker-compose setup done"

echo "before_install.sh done"