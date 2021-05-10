const express = require('express')
const events = require('events')
const cors = require('cors')

const WebSocket = require('ws')
const sse = require('./middleware/sse')

const wss = new WebSocket.Server({ port: 8081 });
const app = express()
const port = 8080

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const eventEmitter = new events.EventEmitter()

app.get('/long-polling', (req, res) => {
  const clientId = req.query.clientId
  eventEmitter.once('notification-long-polling', (forClientId, message) => {
    if (forClientId === clientId) {
      res.send({ message })
    }
  })
})

app.get('/sse', sse.setupSeeConnection, (req, res) => {
  eventEmitter.on('sse', (forClientId, message) => {
    const clientId = req.query.clientId
    if (clientId === forClientId) {
      sse.connectionPool[forClientId].write(`event: notification \n\n data: ${JSON.stringify(message)}\n\n`)
    }
  })
})

wss.on('connection', function connection(ws, req) {
  const params = new URLSearchParams(req.url.slice(1, req.url.length))
  const clientId = params.get('clientId')
  console.log(`Client ${clientId} has connected through websocket!`)
  eventEmitter.on('socket', (forClientId, message) => {
    if (clientId === forClientId) {
      ws.send(message)
    }
  })
})

app.post('/create-notification', (req, res) => {
  
  const { type, forClientId, message } = req.body

  switch(type) {
    case 'long-polling':
      eventEmitter.emit('notification-long-polling', forClientId, message)
      break
    case 'sse':
      eventEmitter.emit('sse',forClientId, message)
    case 'socket':
      eventEmitter.emit('socket',forClientId, message)
    default:
      break
  }
  res.send()
})


app.listen(port, () => {
  console.log(`Server started on ${ port }`)
})

