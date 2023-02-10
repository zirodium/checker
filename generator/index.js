const { randomInt } = require('crypto')
function zeroPad(num, places) {
  let zero = places - num.toString().length + 1
  return Array(+(zero > 0 && zero)).join("0") + num
}

function generateBin(bin){
  let length = 16
  let binLength = String(bin).length
  let ends = length - binLength
  let filledZero = Number(Array(ends).fill(1).join(''))
  let filledNine = Number(Array(ends).fill(9).join(''))
  let result = bin.toString() + randomInt(1+filledZero, 9+filledNine).toString();
  return result
}

function yearGenerate(){
  let year = Math.floor(Math.random() * (28 - 23) + 23)
  let month = Math.floor((Math.random() * 12) + 1)
  year = zeroPad(year, 2)
  month = zeroPad(month, 2)
  return [year, month]
}

function pinGenerate(length){
  const min = Math.pow(10, (length-1));
  const max = Math.pow(10, (length));
  return Math.floor(Math.random() * (max - min) + min);
}

function cardGenerator(bin){
  const cardNum = generateBin(bin)
  const yearAndMonth = yearGenerate()
  const pin = pinGenerate(4)
  const cvv = pinGenerate(3)
  return { cardNum, yearAndMonth, pin, cvv }
}

module.exports = {
  generateBin,
  yearGenerate,
  pinGenerate,
  cardGenerator
}