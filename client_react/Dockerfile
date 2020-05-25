FROM node:alpine AS build-stage

WORKDIR "/app"

RUN npm i react-scripts@3.4.1 -g --silent

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i --silent

COPY . .
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 5000
