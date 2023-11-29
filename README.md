# Do the following steps to make this code work.

- Clone this repository
- Add .env file in root directory
- Paste the follwoing text in .env file: \
``NODE_ENV=development``
- If postgresql database is not installed, download and install the postgresql database in your loacal machine\
[Link to download postgresql from official site](https://www.postgresql.org/download/)
- Navigate to cloned path in integrated terminal of your code editor (or in terminal) and run the following command:\
``npm install``
- If nodemon is not installed, download it globally with the following command:
``npm install nodemon -g``
- Run the following command to let the sequelize-cli create the database for you\
``npx sequelize-cli db:create``
- Run the db migration with the following command:\
``npx sequelize-cli db:migrate``
- Run the following command to start the server:\
``npm run dev``
- Copy and paste the following url in any web browser to access your express server\
``http://localhost:3001/``

### Happy coding :smiley:


