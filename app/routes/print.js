// https://www.npmjs.com/package/escpos

const express = require('express');
const router = express.Router();

const SerialPort = require('serialport')
const createInterface = require('readline').createInterface;
const port = new SerialPort('COM32', { autoOpen: false })

var lineReader = createInterface({
  input: port
});

lineReader.on('line', function (line) {
  console.log(line);
});

router.post('/', async (req, res, next) => {
  const dizimo = req.body.info;
  port.open();
  try {
    port.write("\n")
    port.write("\n")
    port.write("\n")
    await dizimo.forEach(element => {
      port.write(element)
    });
    port.write("\n")
    port.write("\n")
    port.write("\n")
    port.write("\n")

    setTimeout(() => {
      port.close();
    }, 1000);
    res.json(req.body.info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
