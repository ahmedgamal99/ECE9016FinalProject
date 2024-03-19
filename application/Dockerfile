# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npm install @prisma/client

# Copy source files
COPY . /usr/src

# Generate Prisma client
RUN npx prisma generate --schema ./prisma/schema.prisma

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Copy the startup script and ensure it's executable
COPY start.sh /usr/src/start.sh
RUN chmod +x /usr/src/start.sh

# Use the startup script as the entrypoint
CMD ["/usr/src/start.sh"]
