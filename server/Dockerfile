FROM openjdk:8-jdk-alpine AS build-stage
WORKDIR "/app"
COPY . .
RUN ./gradlew bootJar

FROM openjdk:8-jdk-alpine
COPY --from=build-stage /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD java -Dspring.profiles.active=prod -jar app.jar