FROM node:18.16-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]