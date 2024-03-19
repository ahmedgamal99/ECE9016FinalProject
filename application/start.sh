#!/bin/sh
# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://${db_username }:${db_password}@${POSTGRES_HOST}:5432/${db_name}"

# Debugging: Print the constructed DATABASE_URL
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Start the Node application
npm run start
