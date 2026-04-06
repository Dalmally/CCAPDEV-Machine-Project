# The Tech Mod Forum

A web forum platform built for tech enthusiasts and hobbyists to share knowledge, discuss ideas, and engage with the community around technology modifications and repairs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating Engine | Handlebars (express-handlebars) |
| Database | MongoDB |
| Database ODM | Mongoose |
| Session Management | express-session with MongoDB store (connect-mongo) |
| Authentication | bcrypt (password hashing) |
| Environment Variables | dotenv |
| Development | nodemon |

---

## Features

- **User Authentication**: Register and login with email/password, session-based auth
- **Admin System**: Dedicated admin accounts with moderation capabilities
- **Post Management**: Create, view, and delete posts with categorization
- **Categories**: Organized content through customizable categories and subcategories
- **User Profiles**: Public profiles with post history and user badges
- **Voting System**: Upvote/downvote posts to highlight quality content
- **Search Functionality**: Find posts across the forum

---

## Getting Started

To run the website on your machine, follow these steps:

1. Open a terminal to the root of the project folder
2. Install dependencies:
   ```
   npm i
   ```
3. Create a `.env` file with the required environment variables (contact maintainers)
4. Start the server:
   ```
   npm run serve
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```

---

## Admin Account

**Default Admin Credentials:**
- Email: `admin@techmod.forum`
- Password: `adminpassword123`

Admin accounts are identified by the `@techmod.forum` email domain and have special privileges including post and comment deletion.

---

## Project Structure

```
controller/        - Route handlers and business logic
middleware/        - Custom middleware (form handling, auth)
model/            - MongoDB schemas (User, Post, Comment, Category, Admin)
public/
  ├── scripts/    - Client-side JavaScript
  └── styles/     - CSS stylesheets
routes/           - Express route definitions
views/
  ├── layouts/    - Main layout templates
  ├── partials/   - Reusable template components
  └── *.hbs       - Page templates
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=<your_mongodb_connection_string>
SESSION_SECRET=<your_session_secret>
PORT=3000
NODE_ENV=development
```

Contact the repository maintainers for production environment variables.

---

## Database Models

- **User**: Stores user account data, bio, badge, avatar URL
- **Post**: Forum posts with title, content, category, voting metrics
- **Comment**: Nested comments on posts
- **Category**: Topic categories with parent-child relationships
- **Admin**: Admin accounts with special privileges

---

## NPM Scripts

- `npm run serve` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm i` - Install dependencies

