#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
sudo service redis-server stop
sudo systemctl stop expressapp.service
sudo systemctl stop nginx
