#!/bin/bash
cd /home/deploy/pricepal/scrapper
./bin/consloe production
cd /data/aboutprice/current
RAILS_ENV=production bundle exec rake ts:configure
RAILS_ENV=production INDEX_ONLY=true bundle exec rake ts:index
kill -9 $(pidof searchd)
RAILS_ENV=production bundle exec rake ts:start
RAILS_ENV=production bundle exec rake top