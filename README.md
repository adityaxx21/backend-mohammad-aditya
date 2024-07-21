# Backend Express Test
Backend API for generate e-commerce with merchant and customer.

## Acknowledgements
## How To Setup Project
 - install nodejs
 - install postgresql
 - install knex globally `npm i -g knex`
 - create database `ecommerce` or you can change based on env
 - setup `.env` based on `.env.example`

## Apps version
 - mysql version: 8
 - node version: 20
 - docker version: 25 (if using docker)

## How To Run
 - npm install
 - make sure knex installed knex globally
 - knex migrate:latest
 - knex seed:run --specific=seed_user.js
 - knex seed:run --specific=seed_brand.js
 - knex seed:run --specific=seed_merchant.js
 - knex seed:run --specific=seed_product.js
 - npm run dev

## Running with docker
 - chmod +x entrypoint.sh 
 - docker compose up

## Api Docs
you can check on `api-docs.yaml`

## Description
 these apps already work with all requirment, for documentation api alredy put on `api-docs.yaml`. If there any problem with this code you can email me at: adityayatma@gmail.com

