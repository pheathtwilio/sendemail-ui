import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { sendContractEmail } from '../utils/sendgrid'
import { contracts } from '../utils/dummyData'

const app = express()
const PORT = 3001

app.use(cors())

app.use(bodyParser.json())

// Mock login route
app.post('/login', (req: Request<{}, {}>, res: Response) => {
const { username, password } = req.body
if (username === 'test' && password === 'password') {
    res.status(200).json({ success: true, userId: 1 })
}
    res.status(401).json({ success: false, message: 'Invalid credentials' })
})

// Fetch user contracts
app.get('/contracts', (req, res) => {
  const { userId } = req.query
  const userContracts = contracts.filter(contract => contract.userId === Number(userId))
  res.json(userContracts)
})

// Send contract email
app.post('/sendContract', async (req, res) => {
  const { email, contract } = req.body
  try {
    await sendContractEmail(email, contract)
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})