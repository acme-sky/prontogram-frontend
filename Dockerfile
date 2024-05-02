FROM node:21-alpine

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 4173

CMD ["npm","run","--host","preview"]
