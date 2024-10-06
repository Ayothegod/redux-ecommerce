
# Redux Ecommerce Bounty
##### SUSPEND DB AFTER 72 HOURS - 3 DAYS

### seller
Dashboard
- Top products (products with highest amount of time sold - delivered)
- total orders
- total products


    "id": "cm1v28d6m0000xnq9buezoh8a",
    "email": "Ayodailva12@gmail.com",
    "role": "SELLER",
    "iat": 1728206772,
    "exp": 1728811572


// settings
// orders
// customers

POST /orders - Create a new order
GET /orders/:id - Get details of a specific order
GET /orders - Get all orders for a user
PUT /orders/:id - Update an existing order (e.g., shipping details)
DELETE /orders/:id - Cancel or delete an order
GET /orders/status/:id - Check the status of an order