'use strict';

// const wiegand = require('wiegand-encoder');
const wiegand = require('../');

// Calculate parity for already-encoded 24 bit credential strings

const string = '000001110111111011101010';

const { left, right } = wiegand.parity.calculate(string);

console.log(`For "${string}", the left parity bit is ${left} and the right is ${right}`);

// Wrap the string in parity bits

const message = wiegand.parity.wrap(string);

console.log(`"${string}" wrapped in parity bits is "${message}"`);

// Validate the parity bits on the message

try {

  wiegand.parity.validate(message);

} catch (error) {

  console.error(`Message ${message} has invalid parity bits:`, error);
}
