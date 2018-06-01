sudo apt-get update
sudo apt-get install -y build-essential libssl-dev
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh
./install_nvm.sh
source $HOME/.nvm/nvm.sh
source ~/.profile
source ~/.bashrc
nvm ls-remote
nvm install node --latest-npm --reinstall-packages-from=node
nvm alias default node
node -v
source ~/.profile
source ~/.bashrc