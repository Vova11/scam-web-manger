#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
sudo systemctl stop expressapp.service
sudo systemctl stop nginx
