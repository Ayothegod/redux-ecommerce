# Redux Ecommerce Bounty


<!-- 
## Endpoints

### LOGIN

#### HTTP Methods : [POST]

#### Sample Request

**Body**:

- **username** : The username of the user
- **password** : The password of the user

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  username: "admin",
  password: "password",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/login/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

- **refresh** : A short lived token used to obtain another access token
- **access** : Token used to authenticate the user

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTcyMjE0MywiaWF0IjoxNzE3OTk0MTQzLCJqdGkiOiJmNzBmNTY5ODhjNmE0ZTBlYjdjNDYwMzhhODRlMjgzMCIsInVzZXJfaWQiOjJ9.rhbAsueu1xswtBdDqR6flHhneHllDr9_CE0ybXXRUeU",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MDI0MTQzLCJpYXQiOjE3MTc5OTQxNDMsImp0aSI6ImZiYTA4ZWI3OWFhNjQxZTU4ODViZDQwZjlkZmVlMjQ5IiwidXNlcl9pZCI6Mn0.gOyWAN0aog4LhHV7DfzpbwNGU0efxVoARIfrPXCQjUc"
}
```

**Status_code** : 200 OK

### REGISTER

#### HTTP Methods : [POST]

#### Sample Request

**Body**:

- **first_name** : The first name of the user
- **last_name** : The last name of the user
- **username** : The username of the user
- **email** : The email of the user
- **password** : The password of the user

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  first_name: "Ayo",
  last_name: "King",
  username: "Ayo.god2sdq2352433",
  email: "test2129q4s5d23@gmail.com",
  password: "Ayo1234@admin",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/register/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

- **first_name** : The first name of the user
- **last_name** : The last name of the user
- **username** : The username of the user
- **email** : The email of the user
- **password** : The hashed version of the user password

```json
{
  "first_name": "Ayo",
  "last_name": "King",
  "username": "Ayo.god22",
  "email": "test12@gmail.com",
  "password": "pbkdf2_sha256$720000$mh9xG3GGfeDsX2u9eS7S5E$HxBVrnnwRz1wMnNgVzqmdR1C8FIfIIXFg/oPpngRPZU="
}
```

**Status_code** : 201 Created

### REFRESH

#### HTTP Methods : [POST]

#### Sample Request

**Body**:

- **refresh** : A short lived token used to obtain another access token

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  refresh:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTc4ODQyNCwiaWF0IjoxNzE4MDYwNDI0LCJqdGkiOiIzYWI5YWNjZjJkNjU0NWJhOTdiZTUzOGQ4YzMzZDk5NyIsInVzZXJfaWQiOjJ9.4Bq3SjFP-QEZ4K_94NXsGn11hpLoCaHEDBejNLIzd7Q",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(
  "http://127.0.0.1:8000/api/v1/accounts/login/token/refresh/",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

- **access** : Token used to authenticate the user

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MDkwNDQ0LCJpYXQiOjE3MTgwNjA0MjQsImp0aSI6IjI2NWMzZGI5MWUyOTQ3ODg4M2UwODYxNzVmZDFmOTJjIiwidXNlcl9pZCI6Mn0.SfQmyPdf_kDI1A3bzCzbm8YG_GpO-4tZXFZ59dvUSIs"
}
```

**Status_code** : 200 OK

### ADD DEBT

#### HTTP Methods : [POST]

#### Sample Request

**Body**:

- **person**:
  - **first_name**: The debtor or creditor first name
  - **last_name**: The debtor or creditor last name
  - **phone_number**: The debtor or creditor phone number
- **type**: Specifies whether the debt is a debit or credit
- **amount**: The Amount owed
- **currency**: The currency which the debt will be paid in
- **due_date**: The duraion of the debt
- **interest_rate**: The interest rate (optional)
- **payment_frequency**: How often the debt will be paid
- **payment_method**: The method of payment

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NDcwMzMxLCJpYXQiOjE3MTg0NDAzMzEsImp0aSI6IjZjYjcxY2JlM2IyZDQ3OTY4M2E5NmJhODQ5OGMwNzk4IiwidXNlcl9pZCI6MX0.WxaiuUB2AfNapGealoxeLtUGqIdiKThRQhq7wKD-PjQ"
);

const raw = JSON.stringify({
  person: {
    first_name: "Favour",
    last_name: "Jones",
    phone_number: "+2349015867277",
  },
  type: "CR",
  amount: 100,
  currency: "100",
  due_date: "2024-06-15T08:24:59Z",
  interest_rate: 10,
  payment_frequency: "MONTHLY",
  payment_method: "BANK TRANSFER",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/add-debt/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

```json
{
  "id": 7,
  "user_id": 1,
  "type": "CR",
  "person_id": 7,
  "amount": 100.0,
  "currency": "100",
  "due_date": "2024-06-15T08:24:59Z",
  "interest_rate": 10.0,
  "date_created": "2024-06-15T08:50:00.232947Z",
  "last_updated": "2024-06-15T08:50:00.232947Z",
  "payment_frequency": "MONTHLY",
  "payment_method": "BANK TRANSFER",
  "status": "PAID"
}
```

**Status_code** : 201 CREATED

### LIST ALL DEBT

#### HTTP Methods : [GET]

#### Sample Request

```javascript
const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NDcwMzMxLCJpYXQiOjE3MTg0NDAzMzEsImp0aSI6IjZjYjcxY2JlM2IyZDQ3OTY4M2E5NmJhODQ5OGMwNzk4IiwidXNlcl9pZCI6MX0.WxaiuUB2AfNapGealoxeLtUGqIdiKThRQhq7wKD-PjQ"
);

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/list-debts/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "first_name": "",
      "last_name": "",
      "username": "admin",
      "email": "oyinbunuaatani@gmail.com"
    },
    "person": {
      "first_name": "Atani",
      "last_name": "Jones",
      "phone_number": "+2349015867277"
    },
    "type": "DR",
    "amount": 100.0,
    "currency": "NGN",
    "due_date": "2024-06-15T08:24:59Z",
    "interest_rate": 10.0,
    "payment_frequency": "MONTHLY",
    "payment_method": "BANK TRANSFER"
  },
  {
    "id": 2,
    "user": {
      "id": 1,
      "first_name": "",
      "last_name": "",
      "username": "admin",
      "email": "oyinbunuaatani@gmail.com"
    },
    "person": {
      "first_name": "Atani",
      "last_name": "Jones",
      "phone_number": "+2349015867277"
    },
    "type": "DR",
    "amount": 100.0,
    "currency": "NGN",
    "due_date": "2024-06-15T08:24:59Z",
    "interest_rate": 10.0,
    "payment_frequency": "MONTHLY",
    "payment_method": "BANK TRANSFER"
  },
  {
    "id": 8,
    "user": {
      "id": 1,
      "first_name": "",
      "last_name": "",
      "username": "admin",
      "email": "oyinbunuaatani@gmail.com"
    },
    "person": {
      "first_name": "Favour",
      "last_name": "Jones",
      "phone_number": "+2349015867277"
    },
    "type": "CR",
    "amount": 100.0,
    "currency": "NGN",
    "due_date": "2024-06-15T08:24:59Z",
    "interest_rate": 10.0,
    "payment_frequency": "MONTHLY",
    "payment_method": "BANK TRANSFER"
  }
]
```

**Status_code** : 200 OK

### UPDATE DEBT

#### HTTP Methods : [PUT]

#### Sample Request

**Body**:

- **person**:
  - **first_name**: The debtor or creditor first name
  - **last_name**: The debtor or creditor last name
  - **phone_number**: The debtor or creditor phone number
- **type**: Specifies whether the debt is a debit or credit
- **amount**: The Amount owed
- **currency**: The currency which the debt will be paid in
- **due_date**: The duraion of the debt
- **interest_rate**: The interest rate (optional)
- **payment_frequency**: How often the debt will be paid
- **payment_method**: The method of payment
- **status** : The status of the debt

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NDcwMzMxLCJpYXQiOjE3MTg0NDAzMzEsImp0aSI6IjZjYjcxY2JlM2IyZDQ3OTY4M2E5NmJhODQ5OGMwNzk4IiwidXNlcl9pZCI6MX0.WxaiuUB2AfNapGealoxeLtUGqIdiKThRQhq7wKD-PjQ"
);

const raw = JSON.stringify({
  person: {
    first_name: "Atani",
    last_name: "Jones",
    phone_number: "+2349015867277",
  },
  type: "DR",
  amount: 100,
  currency: "50",
  due_date: "2024-06-15T08:24:59Z",
  interest_rate: 10,
  payment_frequency: "MONTHLY",
  payment_method: "BANK TRANSFER",
  status: "PAID",
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/update-debt/2/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

```json
{
  "id": 7,
  "user_id": 1,
  "type": "CR",
  "person_id": 7,
  "amount": 100.0,
  "currency": "100",
  "due_date": "2024-06-15T08:24:59Z",
  "interest_rate": 10.0,
  "date_created": "2024-06-15T08:50:00.232947Z",
  "last_updated": "2024-06-15T08:50:00.232947Z",
  "payment_frequency": "MONTHLY",
  "payment_method": "BANK TRANSFER",
  "status": "PAID"
}
```

**Status_code** : 200 OK

### DEBT DETAILS

#### HTTP Methods : [GET]

#### Sample Request

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NDcwMzMxLCJpYXQiOjE3MTg0NDAzMzEsImp0aSI6IjZjYjcxY2JlM2IyZDQ3OTY4M2E5NmJhODQ5OGMwNzk4IiwidXNlcl9pZCI6MX0.WxaiuUB2AfNapGealoxeLtUGqIdiKThRQhq7wKD-PjQ"
);

const raw = JSON.stringify({
  person: {
    first_name: "Atani",
    last_name: "Jones",
    phone_number: "+2349015867277",
  },
  type: "DR",
  amount: 100,
  currency: "50",
  due_date: "2024-06-15T08:24:59Z",
  interest_rate: 10,
  payment_frequency: "MONTHLY",
  payment_method: "BANK TRANSFER",
  status: "PAID",
});

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/debt-details/1/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

```json
{
  "id": 1,
  "user": {
    "id": 1,
    "first_name": "",
    "last_name": "",
    "username": "admin",
    "email": "oyinbunuaatani@gmail.com"
  },
  "person": {
    "first_name": "Atani",
    "last_name": "Jones",
    "phone_number": "+2349015867277"
  },
  "type": "DR",
  "amount": 100.0,
  "currency": "50",
  "due_date": "2024-06-15T08:24:59Z",
  "interest_rate": 10.0,
  "payment_frequency": "MONTHLY",
  "payment_method": "BANK TRANSFER"
}
```

**Status_code** : 200 OK

### DELETE DEBT

#### HTTP Methods : [PUT]

#### Sample Request

**Body**:

- **is_deleted** : Used to delete a particular debt

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NDcwMzMxLCJpYXQiOjE3MTg0NDAzMzEsImp0aSI6IjZjYjcxY2JlM2IyZDQ3OTY4M2E5NmJhODQ5OGMwNzk4IiwidXNlcl9pZCI6MX0.WxaiuUB2AfNapGealoxeLtUGqIdiKThRQhq7wKD-PjQ"
);

const raw = JSON.stringify({
  is_deleted: true,
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://127.0.0.1:8000/api/v1/accounts/delete-debt/1/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

#### Sample Response

**Body**:

```json
{
  "is_deleted": false
}
```

**Status_code** : 200 OK

# Free Lunch Endpoint

# Authentication

1. **Login:** `/api/auth/login` ( **organization / user** )

   - **Method:** POST
   - **Request Body:**

   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

   **Response:**

   ```json
   {
     "message": "User authenticated successfully",
     "statusCode": 200,
     "data": {
       "access_token": "your-auth-token-here",
   		"email": "email@mail.com",
       "id": "random_id",
   		"isAdmin": true | false
     }
   }

   ```

1. **User** **Signup:** `/api/auth/user/signup` ( **organization only** )

   - **Method:** POST
   - **Request Body:**
     ```jsx
     {
       "email": "user@example.com",
       "password": "password123",
     	"first_name": "",
     	"last_name": "",
     	"phone_number": ""
     }
     ```

1. Create Organization**:** `/api/organization/create`

   - **Method:** `PUT`
   - Description: This is a `PUT` Method because on creating the user, a lunch prize is assigned to the organization table along with the org_id field.. The user has to be loggedIn automatically after been created using the access token returned back. The access token would then be used to update the organization name and lunch price on the table. [CONSUMED.]
   - **Headers: `Authorization: Bearer <access_token>`**
   - **Request Body:**
     ```jsx
     {
     	"organization_name": "",
     	"lunch_price": "" // default to "#1000" if not set
     }
     ```

1. **Staff** **Signup:** `/api/organization/staff/signup` ( **Staff only** )

   - **Method:** POST
   - Description: An `OTP` code would be sent to user email, the token sent would be used within the `otp_token` field
   - **Request Body:**
     ```jsx
     {
       "email": "user@example.com",
       "password": "password123",
     	"otp_token": "", // 6-digit token sent to inbox
     	"first_name": "",
     	"last_name": "",
     	"phone_number": ""
     }
     ```

1. **Create Organization Invite (Admin Only)**
   - Endpoint: `/api/organization/invite`
   - Method: `POST`
   - **Headers: `Authorization: Bearer <access_token>`**
   - Description: Allows an admin user to send an invitation to join the organization.
   - Request Body:
     ```jsx
     {
       "email": "jane@example.com"
     }
     ```
   - Response Body:
     ```jsx
     {
       "message": "success",
       "statusCode": 200,
       "data": null
     }
     ```
1. Update Organization launch wallet balance (Admin Only)
   - Endpoint: `/api/organization/wallet/update`
   - Method: `PATCH`
     - **Headers: `Authorization: Bearer <access_token>`**
     - Description: Allows an admin user to update wallet balance.
     - Request Body:
       ```jsx
       {
         "amount": "<balance>"
       }
       ```
     - Response Body:
       ```jsx
       {
         "message": "success",
         "statusCode": 200,
         "data": null
       }
       ```
1. Update Organization launch price (Admin Only)
   - Endpoint: `/api/organization/launch/update`
   - Method: `PATCH`
     - **Headers: `Authorization: Bearer <access_token>`**
     - Description: Allows an admin user to update launch price.
     - Request Body:
       ```jsx
       {
         "launch_price": "<launch_price>"
       }
       ```
     - Response Body:
       ```jsx
       {
         "message": "success",
         "statusCode": 200,
         "data": null
       }
       ```

# User Section

1. Endpoint **:** `/api/user/profile`
   - **Method:** `GET`
   - **Headers: `Authorization: Bearer <access_token>`**
   - **Request Response:**
     ```jsx

     // you could choose to return just the username or email depending on
     // your usecase
     {
       "message": "User data fetched successfully",
       "statusCode": 200,
       "data": {
     		"id" :"sdcsdc",
         "name": "John Doe",
         "email": "john@mail.com",
         "profile_picture": "user-profile-picture-url",
         "isAdmin": true | false
       }
     }
     ```
2. Add Bank Account **:** `/api/user/bank`

   - **Method:** `PATCH`
   - **Headers: `Authorization: Bearer <access_token>`**
   - **Request Body:**
     ```jsx

     // you could choose to return just the username or email depending on
     // your usecase
     {
     	"bank_number": "1234-5678-9012-3456",
       "bank_code": "123456",
       "bank_name": "Bank Name"
     }
     ```
   - Response :
     ```jsx
     {
       "message": "successfully created bank account",
       "statusCode": 200
     }
     ```

3. Get all Users: `/api/user/all`
   - **Method:** `GET`
   - **Headers: `Authorization: Bearer <access_token>`**
   - **Request Body: None**
   - Response :
     ```jsx
     {
       "message": "successfully created bank account",
       "statusCode": 200,
     	"data": [
     			{
     		    "name": "John Doe",
     		    "email": "john@mail.com",
     		    "profile_picture": "user-profile-picture-url",
     				"user_id": "",
     		  },
     			{
     		    "name": "John Doe",
     		    "email": "john@mail.com",
     		    "profile_picture": "user-profile-picture-url",
     				"user_id": "",
     		  }
     	]
     }
     ```
4. Search Users: `/api/user/search/<nameoremail>`

   - **Method:** `GET`
   - **Headers: `Authorization: Bearer <access_token>`**
   - **Request Body: None**
   - Response :

   ```jsx
   {
     "message": "User found",
     "statusCode": 200,
   	"data":
   			{
   		    "name": "John Doe",
   		    "email": "john@mail.com",
   		    "profile_picture": "user-profile-picture-url",
   				"user_id": "",
   		  }
   }
   ```

# Lunch Section

1. Send a Lunch

   **Endpoint:** `/api/lunch/send`

   - **Method:** `POST`
   - **Description:** Create a new lunch request.
   - **Headers:** `Authorization: Bearer your-auth-token-here`
   - **Request Body:**
     ```json
     {
       "receivers": ["user_id"], // this could contain multiple users
       "quantity": 5,
       "note": "Special instructions for the lunch"
     }

     // prevent the user from sending lunch to him/her self.
     ```
     **Response:**
     ```json
     {
       "message": "Lunch request created successfully",
       "statusCode": 201,
       "data": {}
     }
     ```

1. Get a Lunch

   **Endpoint:** `/api/lunch/:id`

   - **Method:** `GET`
   - **Description:** Get a specific lunch
   - **Headers:** `Authorization: Bearer your-auth-token-here`
   - **Request Body: None**
     **Response:**
     ```json
     {
       "message": "Lunch request created successfully",
       "statusCode": 201,
       "data": {
         "receiverId": "",
         "senderId": "",
         "quantity": 5,
         "redeemed": false,
         "note": "Special instructions for the lunch",
         "created_at": "",
         "id": ""
       }
     }
     ```

1. Get all Lunches

   **Endpoint:** `/api/lunch/all`

   - **Method:** `GET`
   - **Description:** Get a all lunch available for that user
   - **Headers:** `Authorization: Bearer your-auth-token-here`
   - **Request Body: None**
     **Response:**
     ```json
     {
       "message": "Lunch request created successfully",
       "statusCode": 201,
       "data": [
     		{
     			"receiverId": "",
     			"senderId": "",
     		  "quantity": 5,
     			"redeemed": false,
     		  "note": "Special instructions for the lunch",
     			"created_at": ""
           "id": ""
     		},
     		{
     			"receiverId": "",
     			"senderId": "",
     		  "quantity": 5,
     			"redeemed": false,
     		  "note": "Special instructions for the lunch",
     			"created_at": "",
     			"id": ""
     		}
     	]
     }

     ```

### Redeeming A Lunch

1. Redeem launch (Users)
   - Endpoint: `/api/user/redeem`
   - Method: `POST`
     - **Headers: `Authorization: Bearer <access_token>`**
     - Description: Allows a user to add launch credit to launch credit balance. A token must be redeemed before it can be withdrawn
     - Request Body:
       ```jsx
       {
         "ids":[id]
       }
       ```
     - Response Body:
       ```jsx
       {
         "message": "success",
         "statusCode": 200,
         "data": null
       }
       ```

# Withdrawal Request

1. **Endpoint:** `/api/withdrawal/request`

   - **Method:** `POST`
   - **Description:** Create a withdrawal request which deals only with user launch credit and organization launch price.
   - **Headers:** `Authorization: Bearer your-auth-token-here`
   - **Request Body:**

   ```json
   {
     "bank_name": "bank",
     "bank_number": "",
     "bank_code": "",
     "amount": 100
   }
   ```

   **Response:**

   ```json
   {
     "message": "Withdrawal request created successfully",
     "statusCode": 201,
     "data": {
       "id": "unique-withdrawal-id",
       "user_id": "user-id",
       "status": "success", // the status should be updated from pending to successfull state assuming we integrated a payment provider.
       "amount": 100,
       "created_at": "2023-09-19T12:00:00Z"
     }
   }
   ```

   Please adapt and implement these endpoints in your application according to your specific programming language and framework. Ensure proper error handling and security measures in your implementation. -->
