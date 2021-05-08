const express = require('express')


const app = express()
const port = 8080


app.get('/', (req, res) => {
  console.log("Reached...")
  return res.send()
})


app.listen(port, () => {
  console.log(`Server started on ${port}`);
})

