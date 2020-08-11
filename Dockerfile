FROM node:10.22.0-alpine3.9

# copy project files and folders to the current working directory (folder)
COPY package.json .

# install project dependencies
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]

RUN npm rebuild node-sass --force

CMD [ "npm", "run", "serve" ]

