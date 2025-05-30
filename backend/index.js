import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sql from './config/db.js'
import journalRoutes from './routes/journalRoutes.js'
import contactsRoutes from './routes/contactsRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use('/journal', journalRoutes)
app.use('/contacts', contactsRoutes)
app.use('/auth', authRoutes)

// route to test db connection
app.get('/', async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`
    res.send(`Database connected! Server time: ${result[0].now}`)
    console.log('Database connected!')
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).send('Failed to connect to database')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
