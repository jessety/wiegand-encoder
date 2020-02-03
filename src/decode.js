//
//  src/decode.js
//  Created by Jesse Youngblood on 02/02/20
//  Copyright (c) 2020 Jesse Youngblood. All rights reserved.
//

'use strict';

const parity = require('./parity.js');

/**
 * Decode a Wiegand protocol message into a card number and facility code, after validating message parity
 * @param {string} wiegand - Wiegand message
 * @param {boolean=true} [validateParity] - Whether to validate parity bits on the message or not
 * @returns {{cardNumber: string, facilityCode: string}}
 */
function decode(string = null, validateParity = true) {

  if (typeof string !== 'string' || string.length !== 26) {
    throw new Error(`Invalid 26-bit Wiegand string. Received ${string.length} characters: "${string}"`);
  }

  // Confirm the parity bits

  if (validateParity) {
    parity.validate(string);
  }

  // Extract facility code and card number

  const contents = string.substring(1, string.length - 1);

  const facilityCodeBinary = contents.substring(0, 8);
  const cardNumberBinary = contents.substring(8);

  // Cast the binary numbers into integers

  const facilityCode = parseInt(facilityCodeBinary, 2);
  const cardNumber = parseInt(cardNumberBinary, 2);

  return { cardNumber, facilityCode };
}

module.exports = decode;
