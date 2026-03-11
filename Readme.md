E-Commerce Website



A full-stack E-Commerce Web Application built using React (Vite), Redux, Node.js, Express, and MongoDB.

The platform allows users to browse products, add them to the cart, manage profiles, and place orders. It also includes admin functionality for product management.



🚀 Features

👤 User Features



User Signup \& Login



Email Verification using OTP



Browse Products



Product Details Page



Add to Cart



Update Cart Items



Checkout with Address Form



User Profile Management



Protected Routes for authenticated users



🛍 Product Features



Product Listing



Product Details Page



Product Images



Product Filtering



🧑‍💼 Admin Features



Admin Dashboard



Product Management



Image Upload for Products



🔐 Security Features



Authentication Middleware



Protected Routes



Email Verification



Environment Variables for Sensitive Data



🛠 Tech Stack

Frontend



React (Vite)



Redux Toolkit



Tailwind CSS



Axios



React Router



Backend



Node.js



Express.js



MongoDB



Mongoose



Multer (for image uploads)



Other Tools



JWT Authentication



Email OTP Verification



REST APIs



📂 Project Structure

E-COMMERCE-WEBSITE

│

├── backend

│   │

│   ├── controllers

│   │   ├── cartController.js

│   │   ├── productController.js

│   │   └── userController.js

│   │

│   ├── database

│   │   └── db.js

│   │

│   ├── emailVerify

│   │   ├── sendOTPMail.js

│   │   └── verifyEmail.js

│   │

│   ├── middleware

│   │   ├── isAuthenticated.js

│   │   └── multer.js

│   │

│   ├── models

│   │   ├── cartModel.js

│   │   ├── orderModel.js

│   │   ├── productModel.js

│   │   ├── sessionModel.js

│   │   └── userModel.js

│   │

│   ├── routes

│   │   ├── cartRoute.js

│   │   ├── productRoute.js

│   │   └── userRoute.js

│   │

│   ├── utils

│   ├── .env

│   ├── package.json

│   └── server.js

│

├── frontend

│   │

│   ├── public

│   │   ├── ekart.png

│   │   └── vite.svg

│   │

│   ├── src

│   │

│   │   ├── assets

│   │   │   └── images

│   │

│   │   ├── components

│   │   │   ├── Breadcrumbs.jsx

│   │   │   ├── Features.jsx

│   │   │   ├── FilterSidebar.jsx

│   │   │   ├── Footer.jsx

│   │   │   ├── Hero.jsx

│   │   │   ├── ImageUpload.jsx

│   │   │   ├── Navbar.jsx

│   │   │   ├── ProductCard.jsx

│   │   │   ├── ProductDesc.jsx

│   │   │   ├── ProductImg.jsx

│   │   │   ├── ProtectedRoute.jsx

│   │   │   └── Sidebar.jsx

│   │

│   │   ├── pages

│   │   │   ├── admin

│   │   │   ├── AddressForm.jsx

│   │   │   ├── Cart.jsx

│   │   │   ├── Dashboard.jsx

│   │   │   ├── Home.jsx

│   │   │   ├── Login.jsx

│   │   │   ├── Products.jsx

│   │   │   ├── Profile.jsx

│   │   │   ├── Signup.jsx

│   │   │   ├── SingleProduct.jsx

│   │   │   ├── Verify.jsx

│   │   │   └── VerifyEmail.jsx

│   │

│   │   ├── redux

│   │   │   ├── productSlice.js

│   │   │   ├── userSlice.js

│   │   │   └── store.js

│   │

│   │   ├── lib

│   │   │   └── utils.js

│   │

│   │   ├── App.jsx

│   │   ├── main.jsx

│   │   └── index.css

│   │

│   ├── package.json

│   └── vite.config.js

│

└── README.md

⚙️ Installation \& Setup

1️⃣ Clone the repository

git clone https://github.com/yourusername/ecommerce-website.git

cd ecommerce-website

2️⃣ Setup Backend

cd backend

npm install



Create .env



PORT=5000

MONGO\_URI=your\_mongodb\_connection

JWT\_SECRET=your\_secret\_key

EMAIL\_USER=your\_email

EMAIL\_PASS=your\_email\_password



Run backend server:



npm start

3️⃣ Setup Frontend

cd frontend

npm install

npm run dev



Frontend will run on:



http://localhost:5173

🔌 API Endpoints (Example)

User APIs

POST /api/user/signup

POST /api/user/login

POST /api/user/verify-email

GET  /api/user/profile

Product APIs

GET /api/products

GET /api/products/:id

POST /api/products (admin)

Cart APIs

POST /api/cart/add

GET /api/cart

DELETE /api/cart/remove

📸 Screens (Typical Pages)



Home Page



Product Listing



Product Details



Cart Page



Login / Signup



Email Verification



Admin Dashboard



📈 Future Improvements



Payment Gateway Integration ( Razorpay)



Order Tracking



Wishlist



Product Reviews \& Ratings



Search with Filters



Pagination



👨‍💻 Author

Ajay Bhandari

