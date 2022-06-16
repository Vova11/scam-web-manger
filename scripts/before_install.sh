#!/bin/bash
#Stopping existing node server
DIR="/home/ec2-user/scam-web-manger"
if [-d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

echo "Copy file"
cp /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/