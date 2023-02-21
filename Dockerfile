## Install dependencies
FROM node:lts-alpine AS app
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY . .
RUN npm install

