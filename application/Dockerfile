# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npm install @prisma/client

# Set DATABASE_URL environment variable
ENV DATABASE_URL="postgresql://postgres:X9z@4bV!eU2wM8yP@postgres-service:5432/postgres-db"

# Generate Prisma client
RUN npx prisma generate --schema ./prisma/schema.prisma


# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Copy the startup script
COPY start.sh /usr/src/start.sh
RUN chmod +x /usr/src/start.sh

# Use the startup script as the entrypoint
CMD ["/usr/src/start.sh", "npm", "run", "start"]
