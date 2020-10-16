FROM node:12
MAINTAINER woorimprog@gmil.com

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY ./server/package*.json ./

RUN npm install

# 앱 소스 추가
COPY ./server .

EXPOSE 9700
CMD [ "node", "server.js" ]