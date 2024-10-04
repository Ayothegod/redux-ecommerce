import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoute from './routes/auth.route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello User, Welcome to paxx.')
})
app.route("/api/v1/auth", authRoute)


const port = 6000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
