FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY ./nginx.conf /etc/nginx/nginx.conf