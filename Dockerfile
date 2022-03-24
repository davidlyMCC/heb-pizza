#stage 1
FROM node:14 as node
RUN npm install -g @angular/cli
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 4200
CMD ng serve --host 0.0.0.0 --port 4200 --proxy-config src/proxy.conf.json