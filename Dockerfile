FROM node:18.16-alpine

WORKDIR /home/daniil/projects/nefbiMarketplace
COPY package*.json ./
RUN npm cache verify
COPY . ./
EXPOSE 3000
RUN npm run build
CMD ["npm" ,"run" ,"start"]