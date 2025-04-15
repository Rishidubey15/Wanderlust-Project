
 Wanderlust Project
  
 ![image](https://github.com/user-attachments/assets/9e5deee2-acc4-4308-af0d-1767adf3d997)
 🚀 Live Demo

Experience the application live: [Wanderlust Live](https://wanderlust-project-h3cc.onrender.com/listings)



 Overview

Wanderlust is a full-stack web application designed to facilitate the listing and booking of accommodations worldwide. Built using the MERN stack, it offers users a seamless experience in exploring, listing, and managing properties for travel and stay.

 Features

- User Authentication: Secure login and registration system.
- Property Listings: Users can add, edit, and delete property listings.
- Search Functionality: Search for properties based on location and other criteria.
- Responsive Design: Optimized for various devices, ensuring a consistent user experience.

 Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap

- Backend:
  - Node.js
  - Express.js

- Database:
  - MongoDB

- Templating Engine:
  - EJS (Embedded JavaScript)

- Other Tools:
  - Cloudinary for image storage
  - MVC Architecture
  - RESTful APIs
  - AJAX for asynchronous requests

 Installation and Setup

1. Clone the Repository:

   ```bash
   git clone https://github.com/Rishidubey15/Wanderlust-Project.git
   cd Wanderlust-Project
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   SECRET=your_session_secret
   ```

4. Run the Application:

   ```bash
   node app.js
   ```

   The application will be accessible at `http://localhost:3000`.

 Folder Structure

- `controllers/`: Contains route handlers and business logic.
- `models/`: Defines Mongoose schemas and models.
- `routes/`: Express route definitions.
- `views/`: EJS templates for rendering frontend pages.
- `public/`: Static assets like CSS, JS, and images.
- `utils/`: Utility functions and middleware.
- `app.js`: Entry point of the application.
- `cloudConfig.js`: Configuration for Cloudinary integration.
- `middleware.js`: Custom middleware functions.

 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

License
This project is licensed under the MIT License. [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)



