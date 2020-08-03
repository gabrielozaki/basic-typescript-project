# Basic Typescript Project
This is a project to help beginners to start a new project using typescript

## The principles of the project
* Provide a basic project structure
* A functional ORM integration
* Use of Migrations to versioning the database
* Unit tests
* Integration Tests
* Sonar/lint to help the code quality and legibility
* Be easy to test locally
* Documentation to help beginners

## About the tech choices
### Dotenv
Based on the Twelve-factor methodology, we try to keep our config on the environment, it's used as a dev dependency because it's spectated that you use the environment variable of your cloud provider  

### Eslint + Prettier + Airbnb config
Helps to have a nice code readability, with a large use standard like the airbnb

### Jest
An easy-to-go test framework and developed by Facebook, a valid alternative is Mocha, a more modular and smaller minzipped framework.  

### MySQL
Just by example, it's possible to change to any of the TypeORM supported databases

### NVM
Avoid problems by the node and npm versions setting a static version on `.nvmrrc` 

### Testcontainers
It's a simple way to create a more reliable test creating docker containers during the test

### TypeORM
it's a great ORM that uses the advantages of typescript like the decorators(like annotations from Java)

### Winston
Great logger library, it's pretty easy to integrate with ELK using the extension [winston-elasticsearch](https://www.npmjs.com/package/winston-elasticsearch)
