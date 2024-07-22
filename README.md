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

## Terminology:
### UserModule:
- There are 2 user roles.
- A user is a customer.
- An admin is a merchant owner.
- An admin can own more than one merchant.

### BrandModule:
- A brand can only be created by an admin but can be viewed by all roles.
- A brand is universal (not tied to any admin or user).
- A brand is nullable, so a product can be created without a brand.

### MerchantModule:
- A merchant can only be created by an admin but can be viewed by all roles.
- A merchant can only be modified by the admin who owns the merchant.
- A merchant has revenue that increases after a transaction is completed.

### ProductModule:
- A product can only be created by an admin but can be viewed by all roles.
- A product can only be modified by the admin who owns the merchant.
- A product has stock that decreases when a transaction involving the product is completed.

### TransactionModule:
- Transactions can only be viewed by the user or the merchant owner.
- An admin can only see transactions of the merchants they own.
- The request body ‘status’ does not yet have any features.
- After each transaction is completed, the revenue increases, and the product stock decreases.
