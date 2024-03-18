#!/bin/sh

# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL="postgresql://postgres:X9z@4bV!eU2wM8yP@postgres-service:5432/postgres-db"

# Debug: Echo the DATABASE_URL to verify it's correctly constructed
echo "Constructed DATABASE_URL: $DATABASE_URL"

# Now run the original CMD
exec "$@"
