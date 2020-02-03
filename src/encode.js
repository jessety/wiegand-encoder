//
//  src/encode.js
//  Created by Jesse Youngblood on 02/02/20
//  Copyright (c) 2020 Jesse Youngblood. All rights reserved.
//

'use strict';

const parity = require('./parity.js');

/**
 * Encode a given card number and facility code into a wiegand credential message
 * @param {number} cardNumber
 * @param {number=0} [facilityCode]
 * @returns {string} Wiegand credential message
 */
function encode(cardNumber = null, facilityCode = 0) {

  if (['string', 'number'].includes(typeof cardNumber) === false) {
    throw new Error('wiegand.encode() requires a card number');
  }

  if (['string', 'number'].includes(typeof facilityCode) === false) {
    throw new Error('wiegand.encode() requires a facility code');
  }

  // Parse both the card number and the facility code as integers

  cardNumber = parseInt(cardNumber);
  facilityCode = parseInt(facilityCode);

  // Create binary representations of the card number and facility code
  // Pad the card number to 16 bits, and the facility code to 8 bits

  const cardNumberBinary = cardNumber.toString(2).padStart(16, '0');
  const facilityCodeBinary = facilityCode.toString(2).padStart(8, '0');

  // Concatenate the binary representations of the facility code and the card number to create the message

  const credential = [facilityCodeBinary, cardNumberBinary].join('');

  // Calculate parity for each half of the message string

  const { left, right } = parity.calculate(credential);

  // Concatenate the left parity bit, the facility code, the card number, and the right parity bit

  const message = [left, credential, right].join('');

  return message;
}

module.exports = encode;
