# Les Montres - E-commerce Watch Store

A full-stack e-commerce application for luxury watches built with React, Node.js, Express, and MongoDB.

## Features

- 🕐 **Watch Catalog**: Browse luxury watches by brand, category, and price
- 🔍 **Advanced Filtering**: Filter by category, brand, price range, and search
- 🛒 **Shopping Cart**: Add watches to cart, update quantities, remove items
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- 🔄 **Real-time Updates**: Live cart count and inventory management

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Hooks for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Setup

1. **Install dependencies:**
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
   - `MONGODB_URI`: MongoDB connection string

   **Client (.env):**
   - `VITE_API_BASE_URL`: Base URL for API calls (default: http://localhost:3000)

3. **Seed the database with sample watches:**
   ```bash
   cd server && npm run seed
   ```

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

### Watches
- `GET /api/watches` - Get all watches (with filtering/pagination)
- `GET /api/watches/:id` - Get single watch
- `POST /api/watches` - Create new watch (admin)
- `PUT /api/watches/:id` - Update watch (admin)
- `DELETE /api/watches/:id` - Delete watch (admin)

### Metadata
- `GET /api/watches/meta/brands` - Get unique brands
- `GET /api/watches/meta/categories` - Get unique categories

## Sample Data

The application includes sample watches from brands like:
- Rolex (Submariner)
- Omega (Speedmaster)
- Tag Heuer (Carrera)
- Seiko (Presage)
- Casio (G-Shock)
- IWC (Pilot's Watch)

## Project Structure

```
pfe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header/     # Navigation header
│   │   │   ├── ProductCard/# Individual watch card
│   │   │   ├── ProductList/# Watch catalog with filters
│   │   │   └── Cart/       # Shopping cart
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── .env                # Client environment variables
│   └── .env.example        # Client env template
├── server/                 # Express backend
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── models/
│   │   └── Watch.js        # Watch data model
│   ├── routes/
│   │   └── watches.js      # Watch API routes
│   ├── scripts/
│   │   └── seed.js         # Database seeding script
│   ├── server.js           # Main server file
│   ├── .env                # Server environment variables
│   └── .env.example        # Server env template
└── package.json            # Root scripts
```

## Features in Detail

### Watch Model
Each watch includes:
- Basic info: name, brand, description, price
- Images and specifications
- Stock management
- Rating and review system
- Category classification

### Filtering & Search
- Text search across name, brand, and description
- Category filtering (luxury, sport, classic, etc.)
- Brand filtering
- Price range filtering
- Sorting by price, name, rating, or date

### Shopping Cart
- Add/remove items
- Update quantities
- Stock validation
- Price calculations
- Persistent cart state

## Development

### Adding New Features
1. Update the Watch model if needed
2. Add new API routes in `server/routes/`
3. Create new components in `client/src/components/`
4. Update the main App component to integrate new features

### Database Management
- Use `npm run seed` to populate with sample data
- Modify `server/scripts/seed.js` to add more watches
- Access MongoDB directly for advanced queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.