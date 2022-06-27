FROM node
ENV NODE_ENV=production
WORKDIR /src/App
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3001
RUN chown -R node /src/App
USER node
CMD ["npm", "start"]
