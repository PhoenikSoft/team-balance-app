# Team Balance Application

## Environments
- Dev: http://teambalanceapp-dev-env.eu-central-1.elasticbeanstalk.com
- Prod: http://teambalance.cc

## How to boot up the whole project (development version)
In that mode code live-refresh is enabled for frontend.
1. Install Docker: https://docs.docker.com/get-docker/
2. Run command inside the root of the project to boot the project:
    1. `docker-compose up` - will use an old image (won't rebuild projects)
    2. `docker-compose up --build` - rebuilds an image, so all new changes will be applied

## How to boot up the whole project (production version)
1. Install Docker: https://docs.docker.com/get-docker/
2. Run command inside the root of the project to boot the project:
    1. `docker-compose -f docker-compose-prod.yml up` - will use an old image (won't rebuild projects)
    2. `docker-compose -f docker-compose-prod.yml up --build` - rebuilds an image, so all new changes will be applied

## How to boot up backend
1. Install Docker: https://docs.docker.com/get-docker/
2. Run command inside the root of the project to boot the project:
    1. `docker-compose -f docker-compose-be.yml up` - will use an old image (won't rebuild projects)
    2. `docker-compose -f docker-compose-be.yml up --build` - rebuilds an image, so all new changes will be applied
