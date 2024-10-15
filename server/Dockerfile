# /server/Dockerfile
FROM node:18

WORKDIR /YourJoBrain

COPY package*.json ./

RUN yarn install

COPY . ./
COPY wait-for-it.sh ./

RUN chmod +x wait-for-it.sh

EXPOSE 5000
CMD ["./wait-for-it.sh", "db:3306", "--", "node", "index.js"]  # server.jsからindex.jsへ変更
