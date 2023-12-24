FROM node:18-alpine

WORKDIR /app

COPY ./app/package.json .


RUN npm install

COPY ../../app/ ./app

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "dev"]
