#!/bin/sh
# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}"

# Debugging: Print the constructed DATABASE_URL
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Start the Node application
npm run start
