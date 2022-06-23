#!/bin/bash
echo "Changing app user..."
sudo chown -R ec2-user:ec2-user /home/ec2-user/scam-web-manger
echo "run npm install ..."
#navigate into our working directory where we have all our github files
cd /home/ec2-user/scam-web-manger

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install

echo "Copy env"
cp /home/ec2-user/app.env /home/ec2-user/scam-web-manger/src/
sudo systemctl start nginx
sudo systemctl start expressapp.service