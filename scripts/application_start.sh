#!/bin/bash
echo "Changing app user..."
sudo chown -R ec2-user:ec2-user /home/ec2-user/scam-web-manger
echo "Starting application"
sudo systemctl start nginx
sudo systemctl start expressapp.service


