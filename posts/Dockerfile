#Base Image
FROM node:alpine

#Setup working directory
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command, it will run the program when we will create and start the container
CMD ["npm", "start"]