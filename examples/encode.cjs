'use strict';

// const wiegand = require('wiegand-encoder');
const wiegand = require('../');

const facilityCode = 71;
const cardNumbers = [1238, 39, 5000, 4614, 47, 881, 10, 7];

for (const cardNumber of cardNumbers) {

  // Generate the 26-bit wiegand format string for a card number
  // Automatically appends the left and right parity bits

  const encoded = wiegand.encode(cardNumber, facilityCode);

  console.log(`Wiegand string for card ${cardNumber} is: ${encoded}`);
}
