const express = require("express");
const { cardGenerator } = require("./generator");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get("/generate", (req, res) => {
  const { bin, n, fmt, pin } = req.query;
  if (!bin || !n || !fmt || !pin)
    return res
      .status(400)
      .json({
        ok: false,
        result: "Bad Request: Bin & n & fmt & pin Paramer is Not Found!",
      });
  if (fmt === "json") {
    const result = [];
    for (let i = 0; i < n; i++) {
      const card = cardGenerator(bin);
      result.push({
        bin,
        length: String(card.cardNum).length,
        card,
      });
    }
    res.json({
      ok: true,
      result,
    });
  } else if (fmt === "pipe") {
    const result = [];
    let format;
    for (let i = 0; i < n; i++) {
      const card = cardGenerator(bin);
      const [year, month] = card.yearAndMonth;
      if (pin === "yes") {
        format = `${card.cardNum}|${month}|20${year}|${card.cvv}|${card.pin}`;
      } else if (pin === "no") {
        format = `${card.cardNum}|${month}|20${year}|${card.cvv}`;
      } else {
        return res.send("fuck");
      }
      result.push(format);
    }
    res.send(result.join("\n"));
  } else {
    res.status(400).json({
      ok: false,
      result: "Bad Request: fmt is Wrong! use: json | pipe",
    });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
