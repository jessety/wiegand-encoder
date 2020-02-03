'use strict';

// const wiegand = require('wiegand-encoder');
const wiegand = require('../');

const encodedMessages = [
  '01111111111111111111111111',
  '00000000000000000000000001',
  '00000011101111110111010101',
  '10101101100000100110010111',
  '10000111000000010110001111'
];

for (const encoded of encodedMessages) {

  // Decode 26-bit wiegand format strings into a card number and facility code
  // Confirm the left and right parity bits

  try {

    const { cardNumber, facilityCode } = wiegand.decode(encoded);

    console.log(`${encoded} contains card number ${cardNumber} and facility code ${facilityCode}`);

  } catch (error) {

    // The parity bits did not match

    console.error(error);
  }
}
