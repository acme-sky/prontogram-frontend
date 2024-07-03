# build stage
FROM node:21-alpine as build-stage

WORKDIR /app

CMD ["npm","run","--host","preview"]

COPY . .

RUN npm install --force

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]