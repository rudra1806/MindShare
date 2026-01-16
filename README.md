# MindShare

MindShare is a modern, RESTful blogging application built with Node.js, Express.js, and MySQL. It features a responsive, innovative glassmorphism user interface and full CRUD capabilities.

*(Originally prototyped with in-memory storage, this project has been upgraded to use a persistent MySQL database.)*

## Features

- **Create Posts**: Authors can publish thoughts with a username, title, and content.
- **Persistent Storage**: Data is safely stored in a MySQL database.
- **Modern UI**: Custom-built adaptive dark interface featuring glassmorphism effects, gradient text, and smooth animations.
- **Responsive Grid**: Posts are displayed in a responsive grid layout that adapts to all screen sizes.
- **CRUD Operations**: Complete functionality to Create, Read, Update, and Delete posts.
- **Smart Date Formatting**: Dates are elegantly formatted for better readability across different views.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2`)
- **Templating**: EJS
- **Frontend**: HTML5, CSS3 (Modern features: Flexbox, Grid, CSS Variables)
- **Utilities**: 
  - `uuid` (for unique post identification)
  - `method-override` (to support PATCH/DELETE requests from HTML forms)
  - `dotenv` (for environment variable management)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MindShare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_NAME=mindshare
   DB_PASSWORD=your_password
   PORT=8080
   ```

4. **Set up the Database:**
   Execute the schema to create the database and table:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   Or manually run the SQL commands from `database/schema.sql` in your MySQL client.
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
├── index.js              # Main Express server & all routes
├── package.json          # Dependencies & project metadata
├── .env                  # Environment variables (not in git)
├── .gitignore            # Git ignore rules
│
├── database/
│   ├── connection.js     # MySQL connection initialization
│   └── schema.sql        # Database schema & table creation
│
├── public/
│   └── style.css         # Modern dark UI styles (glassmorphism theme)
│
└── views/
    ├── posts.ejs         # Main feed view (responsive grid)
    ├── newpost.ejs       # Create post form
    ├── postdetail.ejs    # Single post detail view
    └── editpost.ejs      # Edit post form
```

## UI/UX Highlights

- **Dark Mode Theme**: #0f1419 background with cyan (#00d4ff) accents
- **Glassmorphism**: Frosted glass effect with backdrop blur (10px)
- **Gradient Elements**: Gradient text for titles, smooth gradient buttons
- **Smooth Animations**: Fade-in effects, hover states, scale transforms
- **Responsive Grid**: Auto-fill grid (320px minimum) that adapts to mobile
- **Modern Typography**: Inter font family with optimized line heights
- **Color Palette**:
  - Primary Accent: #00d4ff (Cyan)
  - Secondary Accent: #6366f1 (Indigo)
  - Edit: #ffc107 (Amber)
  - Delete: #ff4757 (Red)

## Data Storage Evolution

### Phase 1: In-Memory Array (Initial Prototype)
- Posts stored in JavaScript array
- Quick to develop, zero setup
- **Issue**: Data lost on server restart

### Phase 2: MySQL Database (Current - Production Ready)
- Posts persisted in relational database
- Full ACID compliance
- Scalable and reliable

**Migration Details:**
- Replaced array storage with SQL queries
- Implemented connection pooling via `mysql2`
- All queries use parameterized statements (SQL injection protection)
- Automatic timestamp management with `created_at`

## Post Data Structure

```javascript
{
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID v4
  username: "author_name",
  title: "Post Title",
  content: "Post content here...",
  created_at: "2026-01-16T10:30:00.000Z"
}
```

## Security Features

- ✅ SQL parameterized queries (prevents SQL injection)
- ✅ Environment variables for sensitive data (dotenv)
- ✅ UUID v4 for non-sequential post IDs
- ✅ HTTP method override for secure form submissions
- ✅ Server-side error handling & logging

---

*Created by **Rudra Sanandiya**.*