# Getting started:

1. Clone the repo https://github.com/simonbucko/db_for_developers
1. Run `npm i` in the `/server` folder
1. Create a mysql database and run the `eshop-db.sql` script on it to create the database
1. Run the `users.sql` script on the MySQL database as well after creating database
1. Create a new MongoDB
1. Import data from the `eshop.*.json` files into your MongoDB instance
1. Create a new Neo4j database
1. User `neo4j.dump` to import the database
1. Create a `.env` file according to `.env.example` file and change the configuration based on your databases set up
1. Now you should be able to run the project. Make sure you are in `/server` folder and then write `npm run debug`. This script will start the project.
