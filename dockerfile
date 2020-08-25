FROM node:12-slim
WORKDIR /usr/src/app

ENV HOST 0.0.0.0
ENV PORT 8080

COPY package*.json ./

RUN npm install

COPY . .

RUN gcloud kms decrypt --ciphertext-file=./services/firebase/firebase.js.enc --plaintext-file=./services/firebase/firebase.js --location=global --keyring=uwu-land-frontend --key=cloudbuild-firebase-service-account

RUN npm run build

CMD [ "npm", "run", "start" ]