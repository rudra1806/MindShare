# MindShare

A simple RESTful blogging application built with Node.js and Express.js that allows users to create, read, update, and delete posts.

## Features

- **Create Posts** - Add new posts with username, title, and content
- **View All Posts** - Display all posts on a single page
- **View Post Details** - Click on a post to see full details
- **Edit Posts** - Update the title and content of existing posts
- **Delete Posts** - Remove posts from the collection
- **Responsive Design** - Clean and simple UI with CSS styling

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Frontend**: HTML, CSS
- **Utilities**: 
  - UUID (for generating unique post IDs)
  - method-override (for HTTP method tunneling)
  - nodemon (for development)

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd MindShare
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the Server

```bash
node index.js
```

The server will run on `http://localhost:8080`

To run with auto-reload on file changes (requires nodemon):
```bash
nodemon index.js
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check - returns "server is running fine !" |
| GET | `/posts` | Display all posts |
| GET | `/posts/new` | Show form to create a new post |
| POST | `/posts` | Create a new post |
| GET | `/posts/:id` | Display details of a specific post |
| GET | `/posts/:id/edit` | Show form to edit a post |
| PATCH | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Project Structure

```
MindShare/
├── index.js              # Main application file with routes and logic
├── package.json          # Project dependencies and metadata
├── public/
│   └── style.css        # Stylesheet for the application
└── views/
    ├── posts.ejs        # Display all posts
    ├── newpost.ejs      # Form to create new post
    ├── postdetail.ejs   # Display single post details
    └── editpost.ejs     # Form to edit existing post
```

## How It Works

The application stores posts in an in-memory array. Each post contains:
- **id**: Unique identifier (UUID v4)
- **username**: Author's username
- **title**: Post title
- **content**: Post content

**Note**: Data is stored in memory and will be lost when the server restarts. For persistent storage, consider integrating a database like MongoDB or PostgreSQL.

## Sample Data

The application comes with three sample posts to demonstrate functionality:
1. A post by rudra about their first post
2. A post by johnwick announcing a new job
3. A post by jasondavid about completing a marathon

## Development

To modify the styling, edit `public/style.css`.

To add new features or modify the template structure, edit the corresponding EJS files in the `views/` directory.

---

*Created by **Rudra Sanandiya**.*