FROM node:20.19.6-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# We do NOT copy the rest of the code here.
# The 'volumes' in docker-compose will map the code in live.

EXPOSE 3000
# (CMD is handled in docker-compose)