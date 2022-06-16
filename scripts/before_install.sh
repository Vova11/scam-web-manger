#!/bin/bash
#Stopping existing node servers
echo "Before install script"
cp /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/

DIR="/home/ec2-user/scam-web-manger"
if [-d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi