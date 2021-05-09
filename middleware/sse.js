
const connectionPool = {}

const setupSeeConnection = (req, res, next) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Cache-Control', 'no-cache')
  res.flushHeaders();

  const clientId = req.query.clientId
  console.log(`Client ${clientId} has connected!`)
  connectionPool[clientId] = res

  req.on('close', () => {
    delete connectionPool[clientId]
    console.log(`Client ${clientId} has disconnected!`)
  })

  next()
}

module.exports = {
  setupSeeConnection,
  connectionPool
}