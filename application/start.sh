#!/bin/sh
# Dynamically construct the DATABASE_URL from individual components
export DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@postgres-service:5432/$POSTGRES_DB

# Now run the original CMD
exec "$@"
