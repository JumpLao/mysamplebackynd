FROM node:8-alpine
WORKDIR /app
COPY . /app
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
