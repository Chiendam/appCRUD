FROM node:14-alpine
WORKDIR /appDemo
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]


