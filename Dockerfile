FROM nginx:stable

RUN apt-get update && apt-get install -y curl

COPY dist/guru_do_amor/browser /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

COPY certs/selfsigned.crt /etc/nginx/certs/selfsigned.crt
COPY certs/selfsigned.key /etc/nginx/certs/selfsigned.key

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
