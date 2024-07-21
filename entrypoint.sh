#!/bin/sh
if [ ! -f /tmp/first_run_completed ]; then
  until nc -z db 3306; do
    echo "Waiting for database connection..."
    sleep 1
  done
  knex migrate:latest
  knex seed:run --specific=seed_user.js
  knex seed:run --specific=seed_brand.js
  knex seed:run --specific=seed_merchant.js
  knex seed:run --specific=seed_product.js
  touch /tmp/first_run_completed
fi
npm run dev
