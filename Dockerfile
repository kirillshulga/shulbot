FROM node:latest

# Env
ENV BOT_TOKEN="1689886413:AAFk2WzlJB0N5z-RbZfoKrRWHfnl6gDdqpQ"
ENV API_KEY="eb7e1537-0748-4c59-89f0-2879abc32dac"
ENV CRON="0 0 */12 * * *"

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY tslint*.json ./
COPY src /app/src

RUN npm install
RUN npm install tsc -g
RUN npm run build
RUN ls -a

# Bundle app source
COPY . /app

# EXPOSE 8080
CMD [ "npm", "start" ]