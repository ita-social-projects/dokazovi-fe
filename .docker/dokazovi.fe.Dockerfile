FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --no-optional

COPY . ./
RUN npm run build
EXPOSE 3000

ENTRYPOINT ["npm", "start"]
