# Challenge NodeJS API

## Rest API with Nodejs and MongoDB

### To start:

1. Clone this repo using `git clone https://github.com/wchopite/workast_challenge.git`
2. Rename the file `config/database.example.js` to `config/database.js` and setup the database
3. Rename the file `.env.example` to `.env` and setup the environment vars
4. Install the dependencies with `npm install`
5. Create the databases you have setup on `config/database.js`
6. Run the application in development mode with `npm run start:dev`
7. Access `http://localhost:8080/api/users`

The API validates a token sent in the headers. This token must be configured in the .env file (`step number 3`). Each request to the API must include the following headers (including the Authorization header):

```
Content-Type: "application/json"
Authorization: "Bearer 5CD4ED173E1C95FE763B753A297D5"
```

## Things to do after configuration and dependencies installation (test purpose)

1. Create an user using the `/api/users` endpoint
2. Use the id from of the recently created user, and create an article

Check the `swagger doc` `/api/docs` for more information

## Scripts

This repo comes with some npm scripts, you will run them with `npm run <script name>`:

- `start` Run the application in production mode
- `start:dev`: Run the application in development mode
- `lint`: Lint the codebase
- `test`: Run the test suite

## Running the app with docker-compose

If you wish, you can run the app using Docker and Docker Compose. For this, you need:

1. `Install Docker`: https://docs.docker.com/compose/install/
2. `Install Docker Compose`: https://docs.docker.com/compose/install/

Once you have installed them, in the root folder you need to run `docker-compose up`. This command generate the containers with the node app and mongo database. Then you can test it using an application like Postman (for example)

## Endpoints documentation

This API uses swagger for the documentation of endpoints. To access this, you just need to start the server and then access `http://server:port/api/docs`, for example:` http://localhost:8080/api/docs`

## Deployed example

1. Global health check: https://workast-challenge.herokuapp.com/
2. Swagger API Documentation: https://workast-challenge.herokuapp.com/api/docs/

## Thinks to do

1. Add more `test` and improve the current test configuration
2. Make unit test using `mongodb-memory-server`, `sinon` if necessary
3. Add input validation on endpoints using `ajv` https://www.npmjs.com/package/ajv, and generate the docs from this point (this can allow to delete `swagger docs`)
4. Maybe is a good idea to remove the `structure package` for `domain objects` and find a way to use the same `ajv` to validate them
5. Use `nyc` for `coverage`
6. Add a `cache layer` with `redis`
7. Separate in multiple files `express error middleware`. Create custom errors
8. Allow to add a token to the swagger documentation (while still it use)
9. Add files configuration to `CI/CD` (codeship, google cloud build, etc)
