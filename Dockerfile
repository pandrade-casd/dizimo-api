FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "."]

RUN npm install --production

COPY src .

ENTRYPOINT [ "node", "bin/www"]

EXPOSE 8080