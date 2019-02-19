FROM node:latest
MAINTAINER j

WORKDIR /opt/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]