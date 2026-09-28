# ShopSphere 🛒

ShopSphere is a full-stack e-commerce web application built using **React.js** and **ASP.NET Core Web API**. The application provides separate Customer and Admin workflows with JWT-based authentication and role-based authorization.

## 🚀 Features

### Customer

* User registration and login
* JWT-based authentication
* Browse products and categories
* View product details
* Add products to cart
* Update and remove cart items
* Add and remove wishlist items
* Place orders
* View order history and order details

### Admin

* Admin authentication and authorization
* Admin dashboard
* Manage products
* Add, edit, and delete products
* Manage categories
* Manage customer orders
* Update order status

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap
* Axios
* React Router

### Backend

* C#
* ASP.NET Core Web API
* Entity Framework Core
* RESTful APIs
* JWT Authentication
* Role-Based Authorization

### Database

* Microsoft SQL Server

### Development Tools

* Visual Studio
* Visual Studio Code
* Swagger
* Git
* GitHub

## 🏗️ Project Structure

ShopSphere/
│
├── ShopSphere.API/
│   └── ShopSphere.API/
│       ├── Controllers/
│       ├── DTOs/
│       ├── Migrations/
│       ├── Models/
│       ├── Program.cs
│       └── appsettings.json
│
├── ShopSphere.Client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── Services/
│
└── .gitignore

## 🔐 Authentication & Authorization

ShopSphere uses **JWT (JSON Web Token)** authentication to identify authenticated users.

The application supports two roles:

* **Customer** — Access customer features such as products, cart, wishlist, and orders.
* **Admin** — Access administrative features such as product, category, and order management.

Role-based authorization is implemented in the ASP.NET Core Web API.

## 🔄 Application Flow

React Frontend
      ↓
Axios / REST API
      ↓
ASP.NET Core Web API
      ↓
Entity Framework Core
      ↓
SQL Server

Authentication flow:

User Login
    ↓
ASP.NET Core API
    ↓
JWT Token Generated
    ↓
Token Stored on Client
    ↓
Authenticated API Requests
    ↓
Role-Based Access

## 📌 API Testing

Backend APIs are tested using **Swagger UI** during development.

Swagger is used to test authentication, authorization, product management, category management, cart, wishlist, and order-related API endpoints.

## ⚙️ Running the Project

### Backend

1. Open the `ShopSphere.API` solution in Visual Studio.
2. Restore the required NuGet packages.
3. Configure the SQL Server connection string.
4. Apply the Entity Framework Core migrations.
5. Run the ASP.NET Core Web API.
6. Open Swagger to test the API endpoints.

### Frontend

Open a terminal inside:

```text
ShopSphere.Client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will communicate with the ASP.NET Core Web API through RESTful APIs.

## 👨‍💻 Author

**Gowtham Kumar**

Full-Stack Developer | C# | ASP.NET Core | React.js | SQL Server

GitHub: https://github.com/gowthamkumar-dev
