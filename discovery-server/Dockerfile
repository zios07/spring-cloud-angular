FROM openjdk:8-alpine

RUN apk update && apk add bash

COPY target/*.jar ./app.jar

COPY ./wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

CMD [ "java", "-jar", "app.jar" ]