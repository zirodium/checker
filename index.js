
const express = require('express')
const { cardGenerator } = require('./generator')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.get('/generate', (req, res) => {
  const { bin, n } = req.query
  if (!bin || !n) return res.status(400).json({ ok: false, result: "Bad Request: Bin & n Paramer is Not Found!" })
  const result = []
  for (let i = 0; i <= n; i++){
    const card = cardGenerator(bin)
    result.push({
      bin,
      length: String(card.cardNum).length,
      card
    })
  }
  res.json({
    ok: true,
    result
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
