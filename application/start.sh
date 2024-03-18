#!/bin/sh

# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://${db_username}:${db_password}@${POSTGRES_HOST}:5432/${db_name}"

# Debug: Echo the DATABASE_URL to verify it's correctly constructed
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Now run the original CMD
exec "$@"
