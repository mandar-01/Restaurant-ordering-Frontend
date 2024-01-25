# Overview
This is a react application that has four restaurant locations to order from. You can choose to see menu for any location and add items to your cart. The cart is updated on the 'My Cart' page. You can check the cart status at any time. Users have the option to modify the quantities in the cart, and also remove items from the cart.

# Instructions to run

Before running this application, make sure you have started the backend Flask server. Checkout https://github.com/mandar-01/Restaurant-ordering-Backend for more information. Clone this project on your local machine. This article assumes you have Node and npm installed on your machine. Run `npm install` from the root of this project directory. Once all the packages are installed, run `npm start` to start the local development server. Go to your browser at `http://localhost:3000/` to view the application.

Note that if you are running your backend on any port other than 5000, you need to change the port in the `.env` file provided.

# Run unit tests

The application also has a few unit tests to cover critical operations of handling CRUD operations on the cart. To run the tests, go to the root directory of the project and run `npm test`. Press `a` to run all tests. You should see an output like this:

![image](https://github.com/mandar-01/Sweetgreen-Frontend/assets/22301384/f6459a5c-90fc-442e-bdc9-76eb635a26ca)

# Run using Docker

To run the application using Docker, build an image using the given Dockerfile. Run `docker build -t sweetgreen_frontend .` from the root directory to build an image. Once an image is built, run `docker run -p 3000:3000 sweetgreen_frontend` to start the application. Visit `http://localhost:3000/` to view the application.
