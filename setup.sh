#setup rails production env in ubuntu VPS

#Adding User:
sudo adduser deploy
sudo adduser deploy sudo
su deploy
#In mac terminal:
brew install ssh-copy-id
ssh-copy-id deploy@IPADDRESS

#now you can access with

ssh deploy@IPADDRESS

#install ruby
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
rvm install 2.2.2
rvm use 2.2.2 --default
ruby -v

echo "gem: --no-ri --no-rdoc" > ~/.gemrc



# Install Phusion's PGP key to verify packages
gpg --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
gpg --armor --export 561F9B9CAC40B2F7 | sudo apt-key add -

# Add HTTPS support to APT
sudo apt-get install apt-transport-https



# Add the passenger repository
sudo sh -c "echo 'deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main' &gt;&gt; /etc/apt/sources.list.d/passenger.list"
sudo chown root: /etc/apt/sources.list.d/passenger.list
sudo chmod 600 /etc/apt/sources.list.d/passenger.list
sudo apt-get update

# Install nginx and passenger
export rvmsudo_secure_path=1
gem install passenger
rvmsudo passenger-install-nginx-module


#config ngix:
#read:  https://www.digitalocean.com/community/tutorials/how-to-automate-ruby-on-rails-application-deployments-using-capistrano

#capifiy the app
#1.  install gem
#2:  bundle exec cap install

#install postgres
sudo apt-get install postgresql postgresql-contrib
sudo apt-get install libpq-dev
sudo -i -u postgres
psql
create role myod WITH PASSWORD 'xxx' CREATEDB LOGIN;

export MYOD_DATABASE_PASSWORD=xxxx


#install nodejs
sudo apt-get install nodejs

sudo chown deploy:deploy /data/myod
#deploy from local machine
cap production deploy   


#after first deploy:
change the database.yml and secrets.yml with secret key
#symbol link in deploy.rb
set :linked_files, %w{config/database.yml, config/secrets.yml}


#if get an "permission denied (publickey error)" run the following
$ ssh-add -D   #remove existing identities
$ ssh-agent    #copy the lines & run them
$ ssh-add      #uses the output from above