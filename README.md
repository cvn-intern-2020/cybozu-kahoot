## Cybozu Kahoot

Cybozu - Kahoot is a web application that lets users create and manage quizzes as well as host and join them as games.

### Set up

After cloning the repository, change the current directory to the backend folder:

    cd backend

Then install the dependencies:

    npm install

Create a file named .env in the backend folder contains:
| Name | Content |
|--|--|
| PORT | Backend server's port |
| SECRET | Secret to encrypt session |
| MONGODB_URI | MongoDB connection URL |
| CLIENT_URL | Frontend URL |

Start the backend server using:

    npm start

Do the same for the frontend:

    cd ..\frontend
    npm install
    npm start
