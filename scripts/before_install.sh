#!/bin/bash
#Stopping existing nodsse server
DIR="/home/ec2-user/scam-web-manger"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

echo "Copy filerr"
sudo cp -v /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/
