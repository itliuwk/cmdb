FROM nginx

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./front-qas /dist

EXPOSE 80
EXPOSE 33000