## Installation ##
1. Clone the GitHub repository.
2. Create a database user with your desired password using PostgreSQL.
3. Create a new database with the user from the previous step as the owner.
4. Create a .env file using the guidelines of the example.env file, adding in the information from the previous three steps.
5. Run ***npm install*** in the react-app directory.
6. In the main directory run ***pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt***.
7. Open your pipenv shell by running ***pipenv shell***.
8. Run ***flask db upgrade***.
9. Run ***flask seed all*** if seed data is desired.
10. Run ***flask run*** to start the backend server.
11. To start the react server, open a new terminal and run ***npm start*** in the react-app directory.
