FROM openjdk:21-jdk-slim
ARG JAVA_NAME=target/server-0.0.1-SNAPSHOT.jar
#ARG KEY_NAME=target/classes/keys
COPY ${JAVA_NAME} app_music.jar
#COPY ${KEY_NAME} classes/keys
ENTRYPOINT ["java", "-jar", "app_music.jar"]