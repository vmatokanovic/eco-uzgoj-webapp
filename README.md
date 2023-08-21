# Eko Uzgoj Web-Application

## Description
Nowadays, there is an increasing need for people to cultivate plants that are for consumption, but also those that have the function of decorating their environment and purifying the air. There is a trend of growing and maintaining plants in an ecological way, but knowledge about this is often limited and poorly available. In order to promote awareness of its importance, increase the number of interested parties and share knowledge about it, this work should create a web application that is interactive, easy to use and adaptable for all types of devices (responsive design). It is necessary to design and implement a suitable database that the application will use to store all the necessary data. Through the application, interested users could communicate. They could share information about the types of plants they grow or plan to grow, how to get plants, share tips on how to grow plants, and information about products that help them grow. Through the application, it should also be possible for manufacturers of products that help grow plants to advertise, and to provide information about the usefulness of their products to users.

## Technologies
Since it's full-stack application, I decided to use MERN stack, which consist of these technologies:
- MongoDB
- Express
- React
- Node.js

## Features
- Exploring farming methods in ecological way for many plants
- Product ads for product that are used in ecolocical farming
- Chat for every plant where users can share their knowledge, advices or ask questions
- Registration/Login system using JWT
- User roles (basic, admin)
- Admins have extra features to manage database of plants
- Responsive and modern design

## Screenshots
![screen1](https://github.com/vmatokanovic/eco-uzgoj-webapp/assets/102720134/f8faaec0-857a-46f1-acb1-1c2af7af3fd9)

![screen2](https://github.com/vmatokanovic/eco-uzgoj-webapp/assets/102720134/d65c271b-9d3b-47e7-addb-3718dedf6312)

![screen3](https://github.com/vmatokanovic/eco-uzgoj-webapp/assets/102720134/9b5551b8-af2f-4708-8c90-6ffd28fc5387)

![screen4](https://github.com/vmatokanovic/eco-uzgoj-webapp/assets/102720134/3adfdeeb-2b63-4d88-b758-cc0672b3a545)

![screen5](https://github.com/vmatokanovic/eco-uzgoj-webapp/assets/102720134/67defa8d-727a-4a94-a7e4-a2dbd337c503)

## Usage
*You have to install nodemon globally before running project.

*You have to connect to your MongoDB database, because original .env file is not included. It should look like this:
```
PORT=4000
MONGO_URI={Your MondoDB URI}
SECRET={Your secret phrase}
```

First, open terminal and go into "backend" folder and run:
```
npm run dev
```

Then, open another terminal and go into "frontend" folder and run:
```
npm start
```
