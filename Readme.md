# 🛒 E-Commerce Website (Full Stack)

A scalable and feature-rich **Full-Stack E-Commerce Web Application** built using **React (Vite), Redux Toolkit, Node.js, Express, and MongoDB**.

The platform enables users to browse products, manage carts, and place orders, while providing admins with tools to manage products and platform data.

---

## 🚀 Features

### 👤 User Features

* User Authentication (Signup & Login)
* Email Verification using OTP
* Browse and Search Products
* View Product Details
* Add to Cart & Update Cart Items
* Checkout with Address Form
* User Profile Management
* Protected Routes for authenticated access

---

### 🛍 Product Features

* Product Listing Page
* Product Detail Page
* Product Image Upload & Display
* Category-based Filtering

---

### 🧑‍💼 Admin Features

* Admin Dashboard
* Add / Update / Delete Products
* Upload Product Images

---

### 🔐 Security Features

* JWT Authentication
* Protected API Routes
* Email OTP Verification
* Secure Environment Variables

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer (Image Upload)

### Other Tools

* JWT Authentication
* Email OTP Verification
* REST API Architecture

---

## 📂 Project Structure

```
E-COMMERCE-WEBSITE
│
├── backend
│   ├── controllers
│   ├── database
│   ├── emailVerify
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── assets
│   │   ├── lib
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### 👤 User APIs

* `POST /api/user/signup`
* `POST /api/user/login`
* `POST /api/user/verify-email`
* `GET /api/user/profile`

### 🛍 Product APIs

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products` (Admin)

### 🛒 Cart APIs

* `POST /api/cart/add`
* `GET /api/cart`
* `DELETE /api/cart/remove`

---

## 📸 Application Screens

* Home Page
* Product Listing Page
* Product Details Page
* Cart Page
* Login / Signup Page
* Email Verification Page
* Admin Dashboard

---

## 👨‍💻 Author

**Ajay Bhandari**

---

## 📌 Note

This project is built for learning and demonstration purposes and can be extended into a production-ready application.

---
