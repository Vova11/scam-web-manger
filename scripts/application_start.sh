#!/bin/bash
echo "Changing app user..."
sudo chown -R ec2-user:ec2-user /home/ec2-user/scam-web-manger
echo "run npm install ..."
npm install
echo "Starting application"
sudo systemctl start nginx
cp /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/
sudo service redis-server start
#install node modules
npm install
sudo systemctl start expressapp.service


