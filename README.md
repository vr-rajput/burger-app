# burger-app

A burger builder application using **MERN Stack** (MongoDB, Express, React, Node.js). This application allows users to customize their burgers, calculate the price, and place an order.

## Features

- **Burger Builder**: Customize burgers by selecting various slices (ingredients) such as Aloo Tikki, Paneer, and Cheese.
- **Dynamic Price Calculation**: As ingredients are added or removed, the total price updates automatically.
- **Mobile Number Validation**: Ensures users enter a valid 10-digit mobile number before placing an order.  

## Technologies Used

- **MongoDB**: A NoSQL database to store order details and customer information.
- **Express**: A backend framework for creating RESTful APIs and handling HTTP requests.
- **React**: A JavaScript library for building the frontend UI and handling user interactions.
- **Node.js**: A JavaScript runtime for server-side programming.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Font Awesome**: For adding icons to the burger slices.
- **React Toastify**: For displaying notifications (success, error).
- **CSS Flexbox**: To create a responsive layout for the app.

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** (for managing dependencies)
- **MongoDB** (local or cloud MongoDB instance)

### Steps to Run the Project Locally


### Recap of Changes:

- **Backend**: You will set the backend port in the backend `.env` file (`PORT=5000`).


### Explanation:

- **Frontend**:  

- **Proxy Setup**: The line `"proxy": "http://localhost:5000"` in `frontend/package.json` is key. It ensures that all API requests made from the React frontend will be automatically forwarded to `http://localhost:5000` without the need to manually specify the backend URL in the frontend code.

This setup ensures that both the frontend and backend use the same port, and the frontend doesn't need to be aware of the backend URL directly—it's handled by the `proxy` setting in the `package.json`.


1. **Clone the repository**:

   ```bash
   git clone https://github.com/vr-rajput/burger-app.git

