FROM node:12-slim
WORKDIR /usr/src/app

ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV PORT 8080

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]