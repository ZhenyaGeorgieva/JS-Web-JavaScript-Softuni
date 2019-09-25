let express = require('express')
let app = express()
const port = 1337

app.get('/', (req, res) => {
  res.status(200)
  res.send('Welcome to Express.js!')
})

app.listen(port, () => console.log(`Express running on port ${port}...`))
