# Basic Typescript Project
This is a project to help beginners to start a new project using typescript

## The principles of the project
* Provide a basic project structure
* A functional ORM integration
* Use of Migrations to versioning the database
* Integration Tests
* Sonar/lint to help the code quality and legibility
* Be easy to test locally
* Documentation to help beginners

## Project Structure
### src
* `controller` contains the controllers, that would be used as an http entrypoint for the project;

* `database` just a provider wrapper for `PrismaORM`;

* `logger` contains the logger creation logic, there two  behaviours, when debug is on, the log adopt a console friendly format,
when debug is off assumes the default output, is possible to define another format, like elastic search format;

* `prisma` contains the migrations and the schema(where the model/entity are defined);

* `service` contains the business logic

### tests
* `integration` Contain tests that uses multiples parts of the project, even the entire project

## About the tech choices
### git-cz
Normalize commit tool with emojis :heart_eyes:, very useful to make sure all your contributors are following the same pattern of commit message

### Dotenv
Based on the Twelve-factor methodology, we try to keep our config on the environment, it's recommended that you use the environment variable of your cloud provider

### Eslint + Prettier + Airbnb config
Helps to have a nice code readability, with a large use standard like the airbnb

### Jest
An easy-to-go test framework and developed by Facebook, a valid alternative is Mocha, a more modular and smaller minzipped framework.

### MySQL
Just by example, it's possible to change to any of the TypeORM supported databases

### NVM
Avoid problems by the node and npm versions setting a static version on `.nvmrrc`

### Prisma
Right now, probably the ORM with most stars on github

### Testcontainers
It's a simple way to create a more reliable test creating docker containers during the test

### Winston
Great logger library, it's pretty easy to integrate with ELK using the extension [winston-elasticsearch](https://www.npmjs.com/package/winston-elasticsearch)
