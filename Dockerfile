FROM node:18.16-alpine

WORKDIR /usr/src/nefbiMarketplace
COPY package*.json ./
RUN npm cache verify
COPY . ./
EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm" ,"run" ,"start"]