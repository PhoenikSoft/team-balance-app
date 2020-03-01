FROM node:alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install
RUN npm -g install @angular/cli
COPY . .

RUN ng build --prod --output-path=dist --configuration=production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200