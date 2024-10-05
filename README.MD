
# Redux Ecommerce Bounty
##### SUSPEND DB AFTER 72 HOURS - 3 DAYS

### seller
Dashboard
- Top products (products with highest amount of time sold - delivered)
- total orders
- total products


product require (customer name, date scheckdout, [pending,delivered(send-to-mail)])

Order (checkout) - link to product
- order id (maybe id using ints eg 1,2,3)
- buyer name and email
- date of order
- status of order [pending,delivered(sent-to-mail)]


// settings
// orders
// customers

POST /orders - Create a new order
GET /orders/:id - Get details of a specific order
GET /orders - Get all orders for a user
PUT /orders/:id - Update an existing order (e.g., shipping details)
DELETE /orders/:id - Cancel or delete an order
GET /orders/status/:id - Check the status of an order