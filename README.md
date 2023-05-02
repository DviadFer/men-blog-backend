# Clean News

Clean News is an online blog/newspaper template powered by Node.js, Express, and MongoDB. With a responsive frontend design using Bootstrap and EJS, it efficiently handles **user authentication, registration, and article management**.

The application utilizes **session cookies for access control**, managing link access based on login status, and associating articles with authors. Additionally, it performs **data validation** during login and registration by cross-checking user input with the existing database. 

Give it a try with our live demo: https://clean-news.up.railway.app/

## Features

- User authentication and registration with data validation.
- Article posting.
- Session cookies for storing user information and managing access to links.
- Responsive design using Bootstrap and EJS.

## Requirements

1. Clone the repository:

   ```bash
   git clone https://github.com/DviadFer/men-blog-backend.git
   ```

   

2. Install the required dependencies:

   ```bash
   npm install
   ```

   

3. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```bash
   DB_URL=mongodb://your-username:your-password@your-host:your-port/your-database-name
   ```

   

4. Start the server:

   ```bash
   npm start
   ```

   

5. Open your browser and navigate to `http://localhost:4000` to see the app in action.

## Usage

- Register as a new user or log in to an existing account.
- Once logged in, you can access the "New Post" link to create a new article.
- Browse your articles on the main page.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://chat.openai.com/LICENSE) file for more details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [EJS](https://ejs.co/)
- [Railway](https://railway.app/) for hosting the live demo
