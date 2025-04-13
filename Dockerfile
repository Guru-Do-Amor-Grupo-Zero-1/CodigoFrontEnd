FROM node:22-bullseye-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:stable

RUN apt-get update && apt-get install -y curl

COPY --from=build /app/dist/guru_do_amor/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]