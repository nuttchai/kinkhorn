# base image 
FROM node:14.15.5

# set working dir
WORKDIR /app/Frontend

# install app dependencies
COPY . /app

#RUN npm install -g npm@lastest
RUN rm -rf node_modules
RUN npm update & npm cache clean --force
RUN npm install --silent

CMD  npm start

EXPOSE 3000