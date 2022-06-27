FROM node:14-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 4001
RUN chown -R node /app
USER node
CMD ["npm", "start"]
