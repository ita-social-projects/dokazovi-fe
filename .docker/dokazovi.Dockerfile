FROM node:12-alpine as build
WORKDIR '/app/'
COPY package.json .
RUN yarn install
COPY . .
RUN ["npm", "run", "build"]

FROM nginx
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]