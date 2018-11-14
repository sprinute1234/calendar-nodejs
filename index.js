const express = require('express')
const db = require('./db')

const port = 8000

const app = express()

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/api/calendar', (req, res) => {
  db.getAll()
    .then(evenement => {
      console.log(evenement)
      res.send(evenement)
    })
    .catch(err => {
      res.sendStatus(500)
      console.error(err);
    })
})

app.post('/api/calendar', (req, res) => {
  const eventData = req.body
  db.create(req.body)
    .then(newEvent => res.send(newEvent))
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})

app.delete('/api/calendar', (req, res) => {
  const eventData = req.body.id
  db.remove(req.body.id)
    .then(newEvent => res.send(newEvent))
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})

app.use(
  '/client',
  express.static(__dirname + '/public')
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
