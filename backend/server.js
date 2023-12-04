const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const rooms = require('./routes/rooms')

dotenv.config()
require('./config/database')

const app = express()

app.use(cors())
// app.use(cors({ origin: '127.0.0.1', credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/api/v1/rooms', rooms)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
