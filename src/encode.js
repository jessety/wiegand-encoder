//
//  src/encode.js
//  Created by Jesse Youngblood on 02/02/20
//  Copyright (c) 2020 Jesse Youngblood. All rights reserved.
//

'use strict';

const parity = require('./parity.js');

/**
 * Encode a given card number and facility code into a wiegand credential message
 * @param {number} cardNumber - Card number
 * @param {number} facilityCode - Facility code
 * @param {number=16} [cardNumberLength] - How many bits the card number should be
 * @param {number=8} [facilityCodeLength] - How many bits the facility code should be
 * @throws
 * @returns {string} Wiegand credential message
 */
function encode(cardNumber = null, facilityCode = null, cardNumberLength = 16, facilityCodeLength = 8) {

  if (Number.isInteger(cardNumber) === false || cardNumber < 0) {
    throw new Error(`Card number must be a positive integer. Received "${cardNumber}"`);
  }

  if (Number.isInteger(facilityCode) === false || facilityCode < 0) {
    throw new Error(`Facility code must be a positive integer. Received "${facilityCode}"`);
  }

  if (Number.isInteger(cardNumberLength) === false || cardNumberLength < 0) {
    throw new Error(`Card number length must be a positive integer. Received "${cardNumberLength}"`);
  }

  if (Number.isInteger(facilityCodeLength) === false || facilityCodeLength < 0) {
    throw new Error(`Facility code length must be a positive integer. Received "${facilityCodeLength}"`);
  }

  // Create binary representations of the card number and facility code
  // Pad the card number to 16 bits, and the facility code to 8 bits

  const cardNumberBinary = cardNumber.toString(2).padStart(cardNumberLength, '0');
  const facilityCodeBinary = facilityCode.toString(2).padStart(facilityCodeLength, '0');

  if (cardNumberBinary.length > cardNumberLength) {

    const max = parseInt(''.padStart(cardNumberLength, '1'), 2);

    throw new Error(`Card number ${cardNumber} is too large to encode in ${cardNumberLength + facilityCodeLength + 2}-bit format. Maximum possible value is ${max}.`);
  }

  if (facilityCodeBinary.length > facilityCodeLength) {

    const max = parseInt(''.padStart(facilityCodeLength, '1'), 2);

    throw new Error(`Facility code ${facilityCode} is too large to encode in ${cardNumberLength + facilityCodeLength + 2}-bit format. Maximum possible value is ${max}.`);
  }

  // Concatenate the binary representations of the facility code and the card number to create the message

  const credential = [facilityCodeBinary, cardNumberBinary].join('');

  // Calculate parity for each half of the message string

  const { left, right } = parity.calculate(credential);

  // Concatenate the left parity bit, the facility code, the card number, and the right parity bit

  const message = [left, credential, right].join('');

  return message;
}

module.exports = encode;
