################--BUILD DOCKER IMAGE--################
FROM node:14-alpine AS builder

WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

################--BUILD NGINX IMAGE--################
FROM nginx:latest

EXPOSE 80

COPY --from=builder /app/build /usr/share/nginx/html