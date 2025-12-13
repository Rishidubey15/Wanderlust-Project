# 🌍 Wanderlust - Accommodation Listing & Booking Platform

A full-stack MERN application for listing and booking accommodations including houses, villas, vacation rentals, and more. Users can browse properties, add their own listings, leave reviews, and book accommodations with an intuitive interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure signup/login with session management
- **Property Listings**: Browse, search, and filter accommodation listings
- **CRUD Operations**: Create, read, update, and delete your own property listings
- **Reviews & Ratings**: Leave reviews and ratings for properties
- **Image Upload**: Upload multiple images for property listings via Cloudinary
- **Interactive Maps**: View property locations on interactive maps using Mapbox
- **Responsive Design**: Fully responsive UI that works on all devices
- **Form Validation**: Client and server-side validation for all forms
- **Flash Messages**: User-friendly notifications for actions
- **Authorization**: Route protection and ownership verification

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling
- **JavaScript** - Client-side scripting
- **Bootstrap 5** - CSS framework
- **EJS** - Templating engine

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Additional Tools
- **JWT** - Authentication middleware
- **Cloudinary** - Image hosting and management
- **Mapbox API** - Interactive maps and geocoding
- **Connect-Flash** - Flash messages
- **Joi** - Schema validation
- **Method-Override** - HTTP verb support

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.x or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control system

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Rishidubey15/Wanderlust-Project.git
cd Wanderlust-Project
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`.

### Step 3: Set Up MongoDB

**Option A: Local MongoDB Installation**

1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```
3. MongoDB will run on `mongodb://localhost:27017` by default

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address
5. Create a database user

### Step 4: Configure Cloudinary

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy the following credentials:
   - Cloud Name
   - API Key
   - API Secret

### Step 5: Configure Mapbox

1. Sign up for a free account at [Mapbox](https://www.mapbox.com/)
2. Go to your Account page
3. Copy your **Access Token**

### Step 6: Create Environment Variables

Create a `.env` file in the root directory of the project:

```bash
touch .env
```

Add the following environment variables to the `.env` file:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/wanderlust
# For MongoDB Atlas use:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session Secret (generate a random string)
SESSION_SECRET=your_super_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox Configuration
MAPBOX_TOKEN=your_mapbox_access_token
```

**Important Notes:**
- Replace all placeholder values with your actual credentials
- Never commit the `.env` file to version control
- For `SESSION_SECRET`, use a strong random string (e.g., generated using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

## ▶️ Running the Application

### Development Mode

Start the server with automatic restart on file changes:

```bash
npm start
```

Or if you have nodemon installed:

```bash
npm run dev
```

### Production Mode

```bash
NODE_ENV=production npm start
```

The application will be available at: **http://localhost:8080**

## 📁 Project Structure

```
Wanderlust-Project/
│
├── models/              # Database models (Mongoose schemas)
│   ├── listing.js       # Listing model
│   ├── review.js        # Review model
│   └── user.js          # User model
│
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User authentication routes
│
├── controllers/         # Route controllers (business logic)
│   ├── listings.js      # Listing controller
│   ├── reviews.js       # Review controller
│   └── users.js         # User controller
│
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── listings/        # Listing views
│   ├── users/           # User views
│   ├── includes/        # Partial templates
│   └── error.ejs        # Error page
│
├── public/              # Static files
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── images/          # Static images
│
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication middleware
│   └── validation.js    # Validation middleware
│
├── utils/               # Utility functions
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error handler
│
├── cloudinary/          # Cloudinary configuration
│   └── index.js
│
├── init/                # Database initialization
│   └── data.js          # Sample data
│
├── .env                 # Environment variables (not in repo)
├── .gitignore           # Git ignore file
├── app.js               # Express app configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/signup` | Render signup form |
| POST | `/signup` | Register new user |
| GET | `/login` | Render login form |
| POST | `/login` | Login user |
| GET | `/logout` | Logout user |

### Listing Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/listings` | Get all listings |
| GET | `/listings/new` | Render create listing form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | Get single listing |
| GET | `/listings/:id/edit` | Render edit listing form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

### Review Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/listings/:id/reviews` | Add review to listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |

## 🧪 Testing

To test the application:

1. **Create an Account**: Go to `/signup` and register
2. **Login**: Use your credentials to login
3. **Add a Listing**: Click "Add New Listing" and fill in the details
4. **Upload Images**: Select images from your computer
5. **View Listing**: Check your listing on the homepage
6. **Add Review**: Leave a review on any listing
7. **Edit/Delete**: Try editing or deleting your own listings

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if not running
sudo systemctl start mongod
```

### Cloudinary Upload Error

**Solution**: 
- Verify your Cloudinary credentials in `.env`
- Check if your cloud name, API key, and API secret are correct
- Ensure you have upload permissions

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::8080
```

**Solution**: 
```bash
# Find and kill the process using port 8080
# On macOS/Linux
lsof -ti:8080 | xargs kill -9

# On Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change the port in .env file
PORT=3000
```

### Session Issues

**Solution**: Clear browser cookies and cache, or use incognito mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Code Style

- Use consistent indentation (2 or 4 spaces)
- Follow JavaScript ES6+ standards
- Add comments for complex logic
- Write descriptive commit messages

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Rishi Dubey**

- GitHub: [@Rishidubey15](https://github.com/Rishidubey15)

## 🙏 Acknowledgments

- Bootstrap for the UI components
- Cloudinary for image hosting
- Mapbox for mapping services
- MongoDB for the database
- All contributors who help improve this project

## 📧 Contact

If you have any questions or run into issues, please:

- Open an issue on GitHub
- Contact the maintainer through GitHub

---

**Happy Coding! 🚀**

Made with ❤️ by Rishi Dubey

