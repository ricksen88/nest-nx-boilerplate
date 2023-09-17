FROM node:18-alpine
WORKDIR /opt/app
ADD *.json ./
RUN npm install
COPY . .
RUN npx nx build api
RUN npx nx build users