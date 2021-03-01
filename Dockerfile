FROM registry.cn-zhangjiakou.aliyuncs.com/cyyjs/node:14.15.4-alpine

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --production
COPY . /app/
EXPOSE 3000
CMD [ "yarn", "start" ]