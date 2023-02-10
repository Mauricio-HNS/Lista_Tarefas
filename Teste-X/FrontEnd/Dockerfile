ARG NODE_VERSION=19.1.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY ./ ./

RUN yarn install --pure-lockfile
RUN yarn test run
RUN yarn build

FROM nginx:1.23.0-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

COPY --from=build /opt/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000 80