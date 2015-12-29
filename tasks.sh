#!/bin/bash
cd /home/deploy/pricepal/scrapper
./bin/consloe production
cd /data/aboutprice/current
RAILS_ENV=production INDEX_ONLY=true bundle exec rake ts:configure
RAILS_ENV=production INDEX_ONLY=true bundle exec rake ts:index
RAILS_ENV=production bundle exec rake top