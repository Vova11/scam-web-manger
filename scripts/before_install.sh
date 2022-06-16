#!/bin/bash
#Stopping existing node server
DIR="/home/ec2-user/scam-web-manger"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
  cp -v /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi
