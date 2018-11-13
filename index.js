const express = require('express')

const port = 8000

const app = express()

app.use(
  '/client',
  express.static(__dirname + '/public')
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
