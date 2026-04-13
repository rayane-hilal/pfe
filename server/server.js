require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')

const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/watches', require('./routes/watches'))

app.get('/', (req, res) => {
  res.send('E-commerce API for Les Montres')
})

// API endpoint to get data
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from server API!',
    data: [1, 2, 3, 4, 5]
  })
})

// API endpoint to receive data from client
app.post('/api/data', (req, res) => {
  const { message } = req.body
  console.log('Received from client:', message)
  res.json({
    success: true,
    received: message,
    timestamp: new Date().toISOString()
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
