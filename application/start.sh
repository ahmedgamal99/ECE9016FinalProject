#!/bin/sh
# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}"

# Debug: Echo the DATABASE_URL to verify it's correctly constructed
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Now run the original CMD
exec "$@"
