//
//  src/decode.ts
//  Created by Jesse Youngblood on 02/02/20
//  Copyright (c) 2020 Jesse Youngblood. All rights reserved.
//

import parity from './parity';

/**
 * Decode a Wiegand protocol message into a card number and facility code, after validating parity bits
 * @param {string} wiegand - Wiegand message
 * @param {number} [cardNumberLength] - How many bits the card number should be
 * @param {number} [facilityCodeLength] - How many bits the facility code should be
 * @param {boolean=true} [validateParity] - Whether to validate parity bits on the message or not
 * @throws
 * @returns {{cardNumber: string, facilityCode: string}}
 */
export default function decode(string: string, cardNumberLength?: number | undefined, facilityCodeLength?: number | undefined, validateParity = true): { cardNumber: number, facilityCode: number } {

  if (typeof string !== 'string') {
    throw new Error(`Invalid Wiegand credential. Received: "${string}"`);
  }

  if (cardNumberLength === undefined || facilityCodeLength === undefined) {

    // Use the message length to infer the facility code length and the card length
    // If the input length is 26, this will resolve to 8 & 16
    // This enables automatically decoding 26, 34, or 38 bit credentials without specifying element length

    facilityCodeLength = Math.floor((string.length - 2) / 3);
    cardNumberLength = (string.length - 2) - facilityCodeLength;
  }

  if (Number.isInteger(cardNumberLength) === false || cardNumberLength < 0) {
    throw new Error(`Card number length must be a positive integer. Received "${cardNumberLength}"`);
  }

  if (Number.isInteger(facilityCodeLength) === false || facilityCodeLength < 0) {
    throw new Error(`Facility code length must be a positive integer. Received "${facilityCodeLength}"`);
  }

  if (string.length !== facilityCodeLength + cardNumberLength + 2) {
    throw new Error(`Invalid credential length. Expected ${facilityCodeLength + cardNumberLength + 2} bits, recieved ${string.length}.`);
  }

  // Confirm the input characters are binary

  if (string.split('').filter(char => ['0', '1'].includes(char) === false).length > 0) {
    throw new Error(`Invalid Wiegand credential. Expected binary string, received "${string}"`);
  }

  // Confirm the parity bits

  if (validateParity === true) {
    parity.validate(string);
  }

  // Extract facility code and card number

  const contents = string.substring(1, string.length - 1);

  const facilityCodeBinary = contents.substring(0, facilityCodeLength);
  const cardNumberBinary = contents.substring(facilityCodeLength);

  // Cast the binary numbers into integers

  const facilityCode = parseInt(facilityCodeBinary, 2);
  const cardNumber = parseInt(cardNumberBinary, 2);

  return { cardNumber, facilityCode };
}
