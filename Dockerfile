FROM nginx:stable

RUN apt-get update && apt-get install -y curl

COPY dist/guru_do_amor/browser /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
