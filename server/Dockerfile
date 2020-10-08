FROM openjdk:11.0-slim AS build-stage
WORKDIR "/app"
COPY . .
RUN ./gradlew bootJar

FROM openjdk:11.0-slim
COPY --from=build-stage /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD java -Dspring.profiles.active=prod -jar app.jar