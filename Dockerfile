FROM node:12.18.3-stretch
LABEL maintainer="arik"
ENV PORT=3000
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm", "start" ]
CMD [ "npm", "start" ]
EXPOSE 3000