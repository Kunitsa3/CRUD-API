# CRUD-API

## Installation:

Install dependencies `npm i`.
Create `.env` and add all necessary PORT.

## Running application:

Run `npm run start:dev` to start dev server or `npm run start:prod` to start in production mode

## Code Testing:

Run `npm run test` to run tests

## Using the application:

Application allows to:

1. Create new user by POST request to `api/users` with body, that contains required fields(username, age, hobbies).
2. Get all users by sending GET request to `api/users`.
3. Get user by id by sending GET request to `api/users/${userId}`.
4. Update user information by sending PUT request to `api/users/${userId}` with body, that contains fields you want to change.
5. Delete user by sending DELETE request to `api/users/${userId}`.
