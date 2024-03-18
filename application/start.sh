#!/bin/sh

# Source the shell environment to access the environment variables
. $HOME/.profile

# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://${username}:${password}@${POSTGRES_HOST}:5432/${dbname}"

# Debug: Echo the DATABASE_URL to verify it's correctly constructed
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Now run the original CMD
exec "$@"
