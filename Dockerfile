FROM node:16.14.0
COPY . /app
WORKDIR ./app
RUN npm install
CMD npm start