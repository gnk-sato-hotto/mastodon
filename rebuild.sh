#docker-compose stop
docker-compose down
docker-compose build
#docker-compose run --rm web rails assets:clean RAILS_ENV=production
#docker-compose run --rm web rails assets:clobber RAILS_ENV=production
docker-compose run --rm web rails assets:precompile RAILS_ENV=production
#docker-compose run --rm web rails assets:precompile RAILS_ENV=production
#docker-compose build
docker-compose up -d
