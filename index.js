
const express = require('express')
const { cardGenerator } = require('./generator')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.get('/generate', (req, res) => {
  const { bin } = req.query
  if (!bin) return res.status(400).json({ ok: false, result: "Bad Request: Bin Paramer is Not Found!" })
  const card = cardGenerator(bin)
  res.json({
    ok: true,
    result: {
      bin,
      length: String(card.cardNum).length,
      card
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
