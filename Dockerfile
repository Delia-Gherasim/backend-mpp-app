FROM node:20.11
WORKDIR /awesomeApp
COPY package.json .
RUN npm install -g nodemon
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]
