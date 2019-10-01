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
Authorization: "Bearer TOKENTOACCESSTHEAPI"
```

## Scripts

This repo comes with some npm scripts, you will run them with `npm run <script name>`:

- `dev`: Run the application in development mode
- `start` Run the application in production mode 
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:integration`: Run only the integration tests
- `lint`: Lint the codebase
