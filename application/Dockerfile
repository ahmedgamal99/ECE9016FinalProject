# base image
FROM node:alpine

ENV DATABASE_URL=postgresql://test:test@postgres:5432/test

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package*.json ./
COPY prisma ./prisma/

#RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN npm install

RUN npm install @prisma/client

COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
#RUN npx prisma migrate dev
# start app
RUN npm run build
EXPOSE 3000
#CMD npm run dev
CMD ["npm", "run", "start"]