# Product Catalog CRUD Application

This is a full-stack web application designed to demonstrate a CRUD (Create, Read, Update, Delete) operation using Angular as the frontend, Node.js with Express as the backend, and PostgreSQL for the database. It allows users to manage a catalog of products effectively.

## Features

### Backend (Node.js/Express)

- **CRUD Operations**: Supports creating, reading, updating, and deleting product records in a PostgreSQL database.
- **Database Integration**: Uses PostgreSQL to store product data, including fields like name, description, and price.
- **RESTful API**: The backend is structured as a RESTful API providing endpoints to interact with the frontend via HTTP requests.

**API Endpoints**:
- `GET /products`: Retrieve all products.
- `GET /products/:id`: Retrieve a single product by ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product.
- `DELETE /products/:id`: Delete a product.

### Frontend (Angular)

- **Dynamic Product Listing**: Displays a list of products fetched from the backend.
- **Product Management Forms**: Provides forms to add and edit product details.
- **Responsive Design**: Ensures the application is usable on various devices and screen sizes.
- **Interactive UI**: Offers a clean and interactive user interface for a seamless user experience.

### Key Functionalities

- **Viewing Products**: Users can view a list of all products.
- **Adding a New Product**: Includes a form to input the details of a new product, which is then posted to the backend and saved in the database.
- **Editing a Product**: Users can select a product to edit and submit the updated details via a form.
- **Deleting a Product**: Users can remove unwanted products from the database.

