FROM node:21-alpine

WORKDIR /app

CMD ["npm","run","--host","preview"]

COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 4173

