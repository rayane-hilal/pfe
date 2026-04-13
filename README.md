# PFE Project - Full Stack Application

A full-stack application with React client and Node.js/Express server.

## Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Environment Variables:**

   Copy the example environment files:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

   **Server (.env):**
   - `PORT`: Server port (default: 3000)
   - `NODE_ENV`: Environment (development/production)

   **Client (.env):**
   - `VITE_API_BASE_URL`: Base URL for API calls (default: http://localhost:3000)

## Running the Application

### Development Mode (both client and server):
```bash
npm run dev
```

### Run individually:
```bash
# Server
npm run server

# Client
npm run client
```

## API Endpoints

### Server (http://localhost:3000)
- `GET /` - Hello World
- `GET /api/data` - Get sample data
- `POST /api/data` - Send data to server

### Client Features
- Fetches data from server on load
- Sends messages to server via button click
- Displays server responses

## Project Structure
```
pfe/
├── client/          # React frontend
│   ├── src/
│   ├── .env         # Client environment variables
│   └── .env.example # Client env template
├── server/          # Express backend
│   ├── .env         # Server environment variables
│   └── .env.example # Server env template
└── package.json     # Root scripts
```